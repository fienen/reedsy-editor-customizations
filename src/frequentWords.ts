import { chapterEditor, debounce } from "./utils";

/**
 * Extracts text from an HTML element and returns the top 10 most frequent words
 * with their occurrence counts.
 * @param {HTMLElement} element - The DOM element to analyze.
 * @returns {Array<{word: string, count: number}>} - Array of objects sorted by count.
 */
export const getTopTenWordsWithCounts = () => {
    const editorWrapper = document.getElementById('chapter-editor');
    // TODO: After resolving Issue #13, turn this into a user option
    const stopWordList = new Set(['the', 'and', 'a', 'an', 'in', 'on', 'of', 'to', 'is', 'it']);

    // If there was a problem with the editor, kick out of the function
    if (!editorWrapper) return;

    // Extract and normalize the chapter text
    const text = editorWrapper.textContent || editorWrapper.innerText;
    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "") // Remove punctuation
        .split(/\s+/)            // Split by whitespace
        .filter(word => word.length > 0 && !stopWordList.has(word)); // Remove the stop words

    // Count off the words
    const frequencyMap: Record<string, number> = {};
    words.forEach(word => {
        frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    });

    // Convert the map into an array of objects sorted by count: { word: "example", count: 5 }
    const result = Object.keys(frequencyMap)
        .map(word => ({ word: word, count: frequencyMap[word] }))
        .sort((a, b) => b.count - a.count);

    // Slice out top ten
    return result.slice(0, 10);
}

/**
 * Updates the word frequency chart in the DOM by displaying the top ten most frequent words
 * with visual bar representations and their counts.
 * 
 * This function retrieves the word frequency data, clears any existing chart content,
 * and generates a horizontal bar chart where each word is displayed with:
 * - The word itself
 * - A visual bar proportional to its frequency relative to the most frequent word
 * - The exact count of occurrences
 * 
 * If no wrapper element is found or no word data is available, the function exits early
 * or displays a "No data found" message.
 * 
 * @remarks
 * - The function expects a DOM element with id 'rce-word-count-inner' to exist
 * - The generated HTML includes Vue-specific data attributes (data-v-a2feb5b3)
 * - Bar width percentages are calculated relative to the most frequent word (100%)
 * - Logs a console message upon successful update
 * 
 * @returns {void}
 */
export function updateWordFrequencyChart() {
    const wrapper = document.getElementById('rce-word-count-inner');

    // Null check
    if (!wrapper) return;

    const frequentWords = getTopTenWordsWithCounts();

    // Handle case if no words found (e.g. a brand new chapter)
    if (!frequentWords || frequentWords.length === 0) {
        wrapper.innerHTML = '<p>No data found.</p>';
        return;
    }

    // Clear existing content
    wrapper
        .querySelectorAll('.stat')
        ?.forEach(node => node.remove());

    // Get the max count for percentage calculations
    const maxCount = frequentWords[0].count;

    // Render each top word entry
    frequentWords.forEach(item => {
        const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0;

        // Template literal for row markup
        const word = `
            <div class="stat" data-v-a2feb5b3>
                <div class="rce-word" title="${item.word}">${item.word}</div>
                <div class="rce-word-bar">
                    <div class="rce-word-bar-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="rce-word-count">${item.count}</div>
            </div>
        `;
        wrapper.insertAdjacentHTML('beforeend', word);
    });

    console.log('[Reedsy Editor Customizations] Most used words counts updated.');
}

/**
 * Initializes the "Most used words" panel functionality.
 * 
 * Sets up event listeners for the toggle button to show/hide the panel,
 * attaches a debounced keyup event handler to the chapter editor that updates
 * the word frequency chart after 5 seconds of inactivity, and performs an
 * initial update of the chart.
 * 
 * @remarks
 * This function should be called once during application initialization.
 * It relies on the global `chapterEditor` variable being available and
 * expects a DOM element with ID 'rce-word-count-button' to exist.
 * 
 * @returns void
 */
export function initMostUsedWords() {
    // Set up the toggle button behavior for the "Most used words" panel
    let mostUsedWordButton = document.getElementById('rce-word-count-button');

    mostUsedWordButton?.addEventListener('click', function () {
        this.classList.toggle('rce-panel-closed');
    });

    // Create the debounced version of the handler (5000ms = 5 seconds)
    const handleKeyUp = debounce(() => {
        updateWordFrequencyChart();
    }, 5000);

    // Attach it to the end of a key press
    chapterEditor?.addEventListener('keyup', handleKeyUp);

    // Initial population of the chart
    updateWordFrequencyChart();

    console.log('[Reedsy Editor Customizations] "Most used words" panel initialized.');
}