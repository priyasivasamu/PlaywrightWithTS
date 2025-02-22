export class APiUtils {
    apiContext: any;
    loginPayLoad: { userEmail: string; userPassword: string };

    constructor(apiContext: any, loginPayLoad: { userEmail: string; userPassword: string }) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
        if (typeof loginPayLoad === 'string') {
            throw new Error("loginPayLoad should be an object with userEmail and userPassword properties");
        }
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            })//200,201,
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;

    }

  async createOrder(orderPayLoad: any): Promise<{ token: string; orderId: string }>{
        let response = { token: '', orderId: '' };
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                },

            })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }



}
module.exports = { APiUtils };




