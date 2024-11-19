    /**
     * Formats text by replacing square-bracketed names with numbered placeholders
     * @param {string} input - The input text with names in square brackets
     * @returns {string} Formatted text with {{index}} placeholders
     */
    export function formatNames(input) {
        let index = 0;
        return input.replace(/\[([^\]]+)\]/g, () => {
        index+=1;
        return `{{${index}}}`;
        });
    }
