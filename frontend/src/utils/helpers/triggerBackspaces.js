 export const triggerBackspaces = (text) => {
    let activeElement = document.activeElement;

    if (!activeElement || (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA')) {
      console.warn("Aby użyć backspace, musisz mieć zaznaczone pole tekstowe (input/textarea).");

      activeElement = document.getElementById(text);
      return;
    }

    for (let i = 0; i < 6; i++) {
      const backspaceEvent = new KeyboardEvent('keydown', {
        key: 'Backspace',
        code: 'Backspace',
        bubbles: true,
        cancelable: true
      });

      activeElement.dispatchEvent(backspaceEvent);
    }
}
