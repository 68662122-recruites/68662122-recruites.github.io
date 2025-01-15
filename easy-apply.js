document.addEventListener('DOMContentLoaded', (event) => {
    const easyApplyButton = document.querySelector('#easy-apply-button');
    if (easyApplyButton) {
        easyApplyButton.addEventListener('click', () => {
            openEasyApplyModal();
        });
    }
});

function openEasyApplyModal() {
    const modal = document.querySelector('#modal-easy-apply');
    modal.style.display = 'flex';
}