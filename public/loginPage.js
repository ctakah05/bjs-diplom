'use strict'
const userForm = new UserForm();
userForm.loginFormCallback = function(data){
    ApiConnector.login(data, 
        (responce) => {
            if (responce.success) {
                location.reload();
            } else {
                userForm.setLoginErrorMessage(responce.error);
            }
            }
        )
}
userForm.registerFormCallback = function(data){
    ApiConnector.register(data, 
        (responce) => {
            if (responce.success) {
                location.reload()
            } else {
                userForm.setRegisterErrorMessage(responce.error);
            }
            }
        )
}
