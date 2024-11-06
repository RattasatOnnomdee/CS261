// const { default: axios } = require("axios");

const username = document.getElementById('username');
const password = document.getElementById('password');
const submit = document.getElementById('submit');
const show = document.getElementById('show');
const role = document.getElementById('role');

let isPasswordVisible = false;

show.addEventListener('click' , () => {
    isPasswordVisible = !isPasswordVisible;
    password.type = isPasswordVisible ? 'text' : 'password';
    show.textContent = isPasswordVisible ? 'Hide Password' : 'Show Password';
})

submit.addEventListener('click', async () => {
    const userNameValue = username.value;
    const passwordValue = password.value;
    console.log(passwordValue)

    try {
        // Fetch data from the API
        const response = await axios.post(`/api/v1/auth/Ad/verify`, {
            // method: 'POST', // Use POST to send credentials
            UserName: userNameValue,
            PassWord: passwordValue,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const apiData = response.data;
        console.log(apiData)
        // console.log('API Response Data:', apiData.data);

        // Create output object to send to the client
        const output = {
            timestamp: Date.now(),
            status: apiData.status,
            message: apiData.message,
            data: apiData.data
        };

        fetch("http://localhost:8080/api/students", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                "enName": `${apiData.data.displayname_en}`,
                "email": `${apiData.data.email}`,
                "faculty": `${apiData.data.faculty}`,
                "type": `${apiData.data.type}`,
                "userName": `${apiData.data.username}`,
                "password": `${password}`

            })
        });

        // Check if the API response indicates success
        if (output.status === false) {
            console.log("Invalid username or password");
            throw new Error(output.message);
        }

        if (!role.value) {
            throw new Error("You DIDN'T Choose Your Role");
        }else {
            // Function to append user information
            const displayUserInfo = (userInfo) => {
            const success = document.createElement('h1');
            success.classList.add('success');
            success.textContent = 'Successfully Logged In';
            document.getElementById('login-content').appendChild(success);

            const wrapper = document.createElement('div');
            wrapper.classList.add('wrapper');
            document.getElementById('login-content').appendChild(wrapper);

            const userNameElement = document.createElement('h1');
            userNameElement.classList.add('Text');
            userNameElement.textContent = `Username: ${userInfo.displayname_en}`;
            wrapper.appendChild(userNameElement);

            const emailElement = document.createElement('h1');
            emailElement.classList.add('Text');
            emailElement.textContent = `Email: ${userInfo.email}`;
            wrapper.appendChild(emailElement);

            if (userInfo.username) {
                const stdIDElement = document.createElement('h1');
                stdIDElement.classList.add('Text');
                stdIDElement.textContent = `Student ID: ${userInfo.username}`;
                wrapper.appendChild(stdIDElement);
            }

            if (userInfo.faculty) {
                const facultyElement = document.createElement('h1');
                facultyElement.classList.add('Text');
                facultyElement.textContent = `Faculty: ${userInfo.faculty}`;
                wrapper.appendChild(facultyElement);
            }

            if (userInfo.organization) {
                const orgElement = document.createElement('h1');
                orgElement.classList.add('Text');
                orgElement.textContent = `Organization: ${userInfo.organization}`;
                wrapper.appendChild(orgElement);
            }
            const roleElement = document.createElement('h1');
            roleElement.classList.add('Text');
            roleElement.textContent = `Your Role: ${userInfo.type}`;
            wrapper.appendChild(roleElement);
            };

            if (apiData.data.username && apiData.data.statusid && role.value == "Employees") {
                throw new Error("Invalid Students");
            }else if (apiData.data.StatusWork && apiData.data.StatusEmp && role.value == "Students") {
                throw new Error("Invalid Employee");
            }else{
                if (role.value === 'Students') {
                    if (apiData.data.statusid && userNameValue === apiData.data.username) {
                        displayUserInfo(apiData.data);
                    }
                } else if (role.value === 'Employees') {
                    if (apiData.data.StatusEmp && apiData.data.StatusWork && apiData.data.organization) {
                        displayUserInfo(apiData.data);
                    }
                }
            }
        }

        document.querySelectorAll('.login-forget').forEach(el => el.remove());
        document.querySelectorAll('.content').forEach(el => el.remove());
        document.querySelectorAll('#submit').forEach(el => el.remove());
        document.querySelectorAll('#role').forEach(el => el.remove());
        document.querySelectorAll('.show').forEach(el => el.remove())

        const backBtn = document.createElement('button');
        backBtn.classList.add('back');
        backBtn.textContent = 'Log Out';
        backBtn.addEventListener('click', () => {
            location.reload(); // Reload the page to reset the form
        });
        document.getElementById('login-content').appendChild(backBtn);
        document.querySelectorAll(".login_page").forEach(el => {el.style.padding = "45px",el.style.height = "30rem";});

    } catch (error) {
        console.log('Error fetching data from the API:', error.message);
        alert(`An error occurred: ${error.message}. Please try again.`);
        location.reload(); // Reload the page on error
    }
});