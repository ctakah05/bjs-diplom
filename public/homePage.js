const logoutBut = new LogoutButton();
logoutBut.action = () => {
    ApiConnector.logout(location.reload());
}

ApiConnector.current(
(responce) => {
    if (responce.success) {
        ProfileWidget.showProfile(responce.data);
        console.log(responce.data)
    }
    }
)
const ratesBoard = new RatesBoard();
function getRates() {
    ApiConnector.getStocks(
        (responceStocks) => {
            if (responceStocks.success) {
                ratesBoard.clearTable();
                ratesBoard.fillTable(responceStocks.data);
            }
        } 
    )
}
getRates();
setInterval(getRates, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (data){
    console.log(data);
    ApiConnector.addMoney(data, (responce) => {
        if (responce.success) {
            ApiConnector.current((responce) => ProfileWidget.showProfile(responce.data))
            moneyManager.setMessage( responce.success, 'успешное пополнение');
        } else {
          moneyManager.setMessage(responce.success, responce.error);
        }
        }
       )
}
moneyManager.conversionMoneyCallback = function(data){
    ApiConnector.convertMoney(data, (responce) => {
        if (responce.success) {
            ApiConnector.current((responce) => ProfileWidget.showProfile(responce.data))
            moneyManager.setMessage( responce.success, 'успешная конвертация');
        } else {
          moneyManager.setMessage(responce.success, responce.error);
        }
        }
       )
}
moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, (responce) => {
        if (responce.success) {
            ApiConnector.current((responce) => ProfileWidget.showProfile(responce.data))
            moneyManager.setMessage( responce.success, 'успешная конвертация');
        } else {
          moneyManager.setMessage(responce.success, responce.error);
        }
        }
       )
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((responce) => {
    if (responce.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(responce.data);
        moneyManager.updateUsersList(responce.data)
    }
})
favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, (responce) => {
        if (responce.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responce.data);
            moneyManager.updateUsersList(responce.data)
            moneyManager.setMessage( responce.success, 'УСПЕШНО!');
        } else {
          moneyManager.setMessage(responce.success, responce.error);
        }
    })
}
favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data , (responce) => {
        if (responce.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responce.data);
            moneyManager.updateUsersList(responce.data)
            moneyManager.setMessage( responce.success, 'УСПЕШНО!');
        } else {
          moneyManager.setMessage(responce.success, responce.error);
        }
    })
}




