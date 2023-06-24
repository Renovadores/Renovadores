export async function GetToken() {
  var token = "";
  // get token from DB
  var UserId = JSON.parse(sessionStorage.getItem('userId'));
  const responseToken = await fetch(`api/historialrefreshtoken/GetHistorialToken/${UserId}`)
  if (responseToken.ok) {
    const data = await responseToken.json();

    // verify if token has expired
    var currentToken = data.token;
    var currentRefresh = data.refreshToken;
    console.log(currentToken, currentRefresh);
    const responseAuthentication = await fetch("api/usuario/ObtenerRefreshToken", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "tokenExpirado": currentToken,
        "refreshToken": currentRefresh
      })
    });
    if (responseAuthentication.ok) {
      const response = await fetch(`api/historialrefreshtoken/GetHistorialToken/${UserId}`)
      if (response.ok) {
        const newData = await response.json();
        token = newData.token;
      }
    } else {
      // refresh token has expired
    }
  }
  return token;
}