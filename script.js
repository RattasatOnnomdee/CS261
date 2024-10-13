const email = document.getElementById('email');
const stdID = document.getElementById('studentID');
const submit = document.getElementById('submit');

submit.addEventListener('click', async () => {
    const id = stdID.value; // Assuming you're using the password as ID

    try {
        // Fetch data from the API
        const response = await fetch(`/api/student-info/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const apiData = await response.json();
        // Check if the password matches the userName from the API
        if (stdID.value !== apiData.data.userName || email.value !== apiData.data.email) {
            console.log("Invalid StudentID or Email");
            throw error
            // return; // Stop further actions if invalid
        }
        const success = document.createElement('h1');
        success.classList.add('success')
        success.textContent = 'Successfully Login'
        document.getElementById('login-content').appendChild(success)

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        document.getElementById('login-content').appendChild(wrapper)

        const userName = document.createElement('h1');
        userName.classList.add('Text')
        userName.textContent = `Username : ${apiData.data.displayname_en}`;
        wrapper.appendChild(userName);

        const emailElement = document.createElement('h1');
        emailElement.classList.add('Text')
        emailElement.textContent = `Email : ${email.value}`;
        wrapper.appendChild(emailElement);

        const passwordElement = document.createElement('h1');
        passwordElement.classList.add('Text')
        passwordElement.textContent = `StudentID : ${stdID.value}`;
        wrapper.appendChild(passwordElement);

        document.querySelectorAll('.login-forget').forEach(el => el.remove())
        document.querySelectorAll('.content').forEach(el => el.remove())
        document.querySelectorAll('#submit').forEach(el => el.remove())

        const backBtn = document.createElement('button');
        backBtn.classList.add('back');
        backBtn.textContent = 'Log Out';
        backBtn.addEventListener('click', () => {
            location.reload(); // Reload the page to reset the form
        });
        document.getElementById('login-content').appendChild(backBtn)

    } catch (error) {
        console.log('Error fetching data from the API',error.message);
        // console.log('Error Stack Trace:', error.stack);
        // setTimeout(2000)
        alert(`An error occurred. Please try again.`);
        location.reload();
    }
});