import { chapterEditor, debounce } from "./utils";

/**
 * Extracts text from an HTML element and returns the top 10 most frequent words
 * with their occurrence counts.
 * @param {HTMLElement} element - The DOM element to analyze.
 * @returns {Array<{word: string, count: number}>} - Array of objects sorted by count.
 */
export const getTopTenWordsWithCounts = () => {
    const editorWrapper = document.getElementById('chapter-editor');
    const stopWordList = new Set(['the', 'and', 'a', 'an', 'in', 'on', 'of', 'to', 'is', 'it']);

    // 1. Validation
    if (!editorWrapper) return [];

    // 2. Extraction & Normalization
    const text = editorWrapper.textContent || editorWrapper.innerText;
    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "") // Remove punctuation
        .split(/\s+/)            // Split by whitespace
        .filter(word => word.length > 0 && !stopWordList.has(word));

    // 3. Counting
    const frequencyMap: Record<string, number> = {};
    words.forEach(word => {
        frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    });

    // 4. Formatting & Sorting
    // Convert the map into an array of objects: { word: "example", count: 5 }
    const result = Object.keys(frequencyMap)
        .map(word => ({ word: word, count: frequencyMap[word] }))
        .sort((a, b) => b.count - a.count); // Sort descending by count

    // 5. Slicing
    return result.slice(0, 10);
}

export function updateWordFrequencyChart() {
    const wrapper = document.getElementById('rce-word-count-inner');
    if (!wrapper) return;

    const frequentWords = getTopTenWordsWithCounts();
    if (!frequentWords || frequentWords.length === 0) {
        wrapper.innerHTML = '<p>No data found.</p>';
        return;
    }

    // Clear existing content
    wrapper.querySelectorAll('.stat')?.forEach(node => node.remove());

    const maxCount = frequentWords[0].count;

    frequentWords.forEach(item => {
        const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0;

        // Using template literals for cleaner DOM generation (Alternative approach to createElement)
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

    // Attach it to the event
    chapterEditor?.addEventListener('keyup', handleKeyUp);
    updateWordFrequencyChart();
    console.log('[Reedsy Editor Customizations] "Most used words" panel initialized.');
}