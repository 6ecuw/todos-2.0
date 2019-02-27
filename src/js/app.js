import AppView from "./views/AppView"

window.onload = () => {
    new AppView()
    
    // Хак для вставки текста из вне
    document.querySelector('[contenteditable]').addEventListener('paste', (e) => {
        e.preventDefault();
        const text = (e.originalEvent || e).clipboardData.getData('text/plain');
        window.document.execCommand('insertText', false, text);
    });
}
