function extractErrorMessage(data) {
    try {
        const jsonMatch = data.match(/{.*?}/);
        if (jsonMatch) {
            const jsonObject = JSON.parse(jsonMatch[0]);
            return jsonObject.message || 'No error message found';
        }
    } catch (error) {
        console.error('Error while parsing the message:', error);
    }
    return 'No error message found';
}

module.exports = {
    extractErrorMessage
}