const messages = [{ id: 1, content: 'Hello world!'}, { id: 2, content: 'I am a second message'}];

export const messageResolver = {
    async messages() {
        return messages
    }
};
