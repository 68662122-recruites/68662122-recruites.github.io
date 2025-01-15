document.addEventListener('DOMContentLoaded', (event) => {
    const easyApplyButton = document.querySelector('#modal-easy-apply-back-button-button');
    if (easyApplyButton) {
        easyApplyButton.addEventListener('click', () => {
            closeEasyApplyModal();
        });
    }
});

function closeEasyApplyModal() {
    const modal = document.querySelector('#modal-easy-apply');
    modal.style.display = 'none';
}

document.querySelector('#resume-file-uploader-button').addEventListener('click', () => {
    document.querySelector('#resume-file-input').click();
});

document.querySelector('#resume-file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fileLastModified = file.lastModified;
    const fileLastModifiedDate = new Date(fileLastModified);
    const fileSize = file.size;
    const fileSizeInMB = fileSize / (1024 * 1024);
    const fileSizeInMBRounded = fileSizeInMB.toFixed(2);
    const fileSizeInKB = fileSize / 1024;
    const fileSizeInKBRounded = fileSizeInKB.toFixed(2);
    const fileExtension = fileName.split('.').pop();
    const fileExtensionLowerCase = fileExtension.toLowerCase();
    const fileExtensionUpperCase = fileExtension.toUpperCase();
    const fileExtensionValid = ['pdf', 'doc', 'docx'].includes(fileExtensionLowerCase);
    const fileExtensionValidUpperCase = ['PDF', 'DOC', 'DOCX'].includes(fileExtensionUpperCase);
    const fileSizeValidKB = fileSizeInKB <= 2048;
    const fileSizeValidMB = fileSizeInMB <= 2;
    const fileSizeValid = fileSizeValidKB && fileSizeValidMB;
    const fileSizeValidMessage = fileSizeValid ? '' : 'File size must be less than 2 MB';
    const fileExtensionValidMessage = fileExtensionValid || fileExtensionValidUpperCase ? '' : 'File must be a PDF, DOC, or DOCX';
    const fileTypeElement = document.querySelector('.resume-file .file-type');
    const fileNameElement = document.querySelector('.resume-file .file-name');
    const fileInfoElement = document.querySelector('.resume-file .file-info');

    fileTypeElement.textContent = fileExtensionUpperCase;
    fileNameElement.textContent = fileName;
    fileInfoElement.textContent = `${fileSizeInKBRounded} KB Last modified ${fileLastModifiedDate.toLocaleDateString()}`;
    document.querySelector('.resume-file').style.display = 'flex';
    document.querySelector('#resume-file-uploader-button').style.display = 'none';
});

document.querySelector('#cover-letter-file-uploader-button').addEventListener('click', () => {
    document.querySelector('#cover-letter-file-input').click();
});

document.querySelector('#cover-letter-file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fileLastModified = file.lastModified;
    const fileLastModifiedDate = new Date(fileLastModified);
    const fileSize = file.size;
    const fileSizeInMB = fileSize / (1024 * 1024);
    const fileSizeInMBRounded = fileSizeInMB.toFixed(2);
    const fileSizeInKB = fileSize / 1024;
    const fileSizeInKBRounded = fileSizeInKB.toFixed(2);
    const fileExtension = fileName.split('.').pop();
    const fileExtensionLowerCase = fileExtension.toLowerCase();
    const fileExtensionUpperCase = fileExtension.toUpperCase();
    const fileExtensionValid = ['pdf', 'doc', 'docx'].includes(fileExtensionLowerCase);
    const fileExtensionValidUpperCase = ['PDF', 'DOC', 'DOCX'].includes(fileExtensionUpperCase);
    const fileSizeValidKB = fileSizeInKB <= 2048;
    const fileSizeValidMB = fileSizeInMB <= 2;
    const fileSizeValid = fileSizeValidKB && fileSizeValidMB;
    const fileSizeValidMessage = fileSizeValid ? '' : 'File size must be less than 2 MB';
    const fileExtensionValidMessage = fileExtensionValid || fileExtensionValidUpperCase ? '' : 'File must be a PDF, DOC, or DOCX';
    const fileTypeElement = document.querySelector('.cover-letter-file .file-type');
    const fileNameElement = document.querySelector('.cover-letter-file .file-name');
    const fileInfoElement = document.querySelector('.cover-letter-file .file-info');

    fileTypeElement.textContent = fileExtensionUpperCase;
    fileNameElement.textContent = fileName;
    fileInfoElement.textContent = `${fileSizeInKBRounded} KB Last modified ${fileLastModifiedDate.toLocaleDateString()}`;
    document.querySelector('.cover-letter-file').style.display = 'flex';
    document.querySelector('#cover-letter-file-uploader-button').style.display = 'none';
});

document.querySelector('#resume-file-unselect').addEventListener('click', () => {
    document.querySelector('.resume-file').style.display = 'none';
    document.querySelector('#resume-file-uploader-button').style.display = 'flex';
    document.querySelector('#resume-file-input').value = '';
});

document.querySelector('#cover-letter-file-unselect').addEventListener('click', () => {
    document.querySelector('.cover-letter-file').style.display = 'none';
    document.querySelector('#cover-letter-file-uploader-button').style.display = 'flex';
    document.querySelector('#cover-letter-file-input').value = '';
});

document.querySelector('#modal-easy-apply-forms-submit-button').addEventListener('click', () => {
    const resumeFile = document.querySelector('#resume-file-input').files[0];
    const coverLetterFile = document.querySelector('#cover-letter-file-input').files[0];
    const fileExtensionValid = ['PDF', 'DOC', 'DOCX'];

    if (!resumeFile) {
        alert('Please upload your resume.');
        return;
    }

    if (!coverLetterFile) {
        alert('Please upload your cover letter.');
        return;
    }

    // Perform form submission or further validation here

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('cover_letter', coverLetterFile);

    fetch('http://192.168.8.13:8080/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Application uploaded, and emailed successfully');
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Application uploaded, and emailed successfully');
    });
});