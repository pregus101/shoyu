function checkPasswords() {
    const signindiv = document.getElementById("signinbox");
    const mainpage = document.getElementById("mainpage");
    var ename = document.getElementById("username").value;
    var epass = document.getElementById("password").value;
    var access = false;

    ename = ename.toLowerCase();
    console.log(ename);
    console.log(epass);
    let clearance;

    epass = sha256(epass);
    epass.then((data) => epass = data);
    console.log(epass);
    
    console.log(epass);
    
    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                if (data[i]["username"] === ename && data[i]["password"] === epass) {
                    access = true;
                    clearance = data[i]["clearance"];
                    break;
                }
            }

            if (access) {
                signindiv.style = "display: none";
                mainpage.style = "display: block";

                displayhidesecure(clearance);
            } else {
                document.getElementById("incorrect").innerText = "Incorrect Username or Password!";
            }
        })
        .catch(error => console.error('Error fetching users:', error));
}

function displayhidesecure(clearance) {
    const secureitems = document.querySelector(".needsclearance");
    const displayitems = document.querySelector(".display");
    if (clearance >= 3) {
        displayitems.style = "display: none";
        secureitems.style = "display: block";
    } else if (clearance < 3) {
        displayitems.style = "display: block";
        secureitems.style = "display: none";
    }
}

var visible = false;

function togglepwdvis() {
    const pwdin = document.getElementById("password");
    const togglebtn = document.getElementById("showhidepwd");

    if (visible == false) {
        visible = true;
        pwdin.type = "text";
        togglebtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else if (visible == true) {
        visible = false;
        pwdin.type = "password";
        togglebtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
    
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);                    
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function signOut() {
    location.reload();
}
