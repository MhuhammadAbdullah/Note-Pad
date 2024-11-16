const themeButtons = document.querySelectorAll('.theme-switcher button');
const body = document.body;
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        body.style.backgroundColor = button.style.backgroundColor;
    });
});

const shareBtn = document.querySelector('.share-btn');
const postGrid = document.querySelector('.post-grid');
const emojiBtn = document.querySelector('.emoji-btn');
const emojiPicker = document.querySelector('.emoji-picker');
const textarea = document.querySelector('textarea');
const imageUploadBtn = document.querySelector('.image-upload-btn');
const imageUploadInput = document.querySelector('.image-upload-input');

// Modal Elements
const editPostModal = document.querySelector('.edit-post-modal');
const editTextArea = document.querySelector('.edit-textarea');
const editImageInput = document.querySelector('.edit-image-input');
const saveChangesBtn = document.querySelector('.save-changes-btn');
const closeModalBtn = document.querySelector('.close-modal-btn');

emojiBtn.addEventListener('click', () => {
    emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block';
});

emojiPicker.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        textarea.value += e.target.textContent;
    }
});

imageUploadBtn.addEventListener('click', () => {
    imageUploadInput.click();
});

shareBtn.addEventListener('click', () => {
    const postContent = textarea.value;
    const imageFile = imageUploadInput.files[0];
    if (postContent.trim() === '' && !imageFile) return;

    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `
        <div class="user-info">
            <img src="assets/profile-icon-male.jpg" alt="User profile picture" width="40" height="40">
            <div class="name">John Doe</div>
            <div class="time">Just now</div>
        </div>
        <div class="content">${postContent}</div>
        <div class="image-container"></div>
        <div class="actions">
            <div class="left">
                <button><i class="fas fa-heart"></i> Like</button>
                <button><i class="fas fa-comment"></i> Comment</button>
                <button><i class="fas fa-share"></i> Share</button>
            </div>
            <div class="right">
                <button class="edit-btn"><i class="fas fa-edit"></i> Edit</button>
                <button class="delete-btn"><i class="fas fa-trash"></i> Delete</button>
            </div>
        </div>
    `;
    
    // Display image if uploaded
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Uploaded image';
            img.classList.add('post-image');
            post.querySelector('.image-container').appendChild(img);
        };
        reader.readAsDataURL(imageFile);
    }

    postGrid.appendChild(post);
    textarea.value = '';
    imageUploadInput.value = '';

    const editBtn = post.querySelector('.edit-btn');
    const deleteBtn = post.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
        // Open the modal and populate the current content for editing
        editTextArea.value = post.querySelector('.content').textContent;

        // Get the current image if it exists
        const currentImage = post.querySelector('.image-container img');
        if (currentImage) {
            editImageInput.value = ''; // Clear previous file input
            editImageInput.dataset.currentImageSrc = currentImage.src; // Store the current image source
        } else {
            editImageInput.value = ''; // No image case
        }

        editPostModal.style.display = 'block';

        // Save the changes
        saveChangesBtn.addEventListener('click', () => {
            const newContent = editTextArea.value;
            const newImageFile = editImageInput.files[0];

            post.querySelector('.content').textContent = newContent;

            // Handle new image upload
            if (newImageFile) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = 'Edited image';
                    const imageContainer = post.querySelector('.image-container');
                    imageContainer.innerHTML = '';  // Clear old image
                    imageContainer.appendChild(img);
                };
                reader.readAsDataURL(newImageFile);
            } else if (editImageInput.value === '') {
                // If no new image, keep the old image or clear it
                const imageContainer = post.querySelector('.image-container');
                imageContainer.innerHTML = '';  // Clear old image if no new image is selected
            }

            // Close modal after saving changes
            editPostModal.style.display = 'none';
        });
    });

    deleteBtn.addEventListener('click', () => {
        post.remove();
    });
});

// Close the modal when the close button is clicked
closeModalBtn.addEventListener('click', () => {
    editPostModal.style.display = 'none';
});
