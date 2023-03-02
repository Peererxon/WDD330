import ExternalServices from './ExternalServices.mjs';

export default class Authentication {
  constructor() {
    this.token = null;
    this.services = new ExternalServices();
  }
  static async login() {
    const externalServices = new ExternalServices();

    try {
      const response = await externalServices.loginRequest({
        email: 'user1@email.com',
        password: 'user1'
      });
      // eslint-disable-next-line no-console
      console.log(
        '🚀 ~ file: admin.mjs:16 ~ Authentication ~ document.querySelector ~ response:',
        response
      );

      this.token = response.token;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(
        '🚀 ~ file: admin.mjs:17 ~ Authentication ~ document.querySelector ~ error:',
        error
      );
    }
  }

  static buildLogin() {
    // Shouldn't this be called 'buildLogin' or something?
    // ok I renamed it to buildLogin because it makes sense
    return `
        <form class='login' id="admin-form">
            <label for='username'>Username</label>
                <input type='text' name='username' id='username' required>
            <label for='password'>Password</label>
                <input type='password' name='password' id='password' required>
            <button id='submit' type='submit'>Submit</button>
        </form>`;
  }
}
