export 

/**
 * Extracts text from an HTML element and returns the top 10 most frequent words
 * with their occurrence counts.
 * @param {HTMLElement} element - The DOM element to analyze.
 * @returns {Array<{word: string, count: number}>} - Array of objects sorted by count.
 */
export const getTopTenWordsWithCounts = () => {
    const editorWrapper = document.getElementById('editor-wrapper');
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
    const frequencyMap = {};
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