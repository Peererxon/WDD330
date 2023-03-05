import ExternalServices from './ExternalServices.mjs';

export default class Authentication {
  constructor() {
    this.token = null;
    this.services = new ExternalServices();
  }
  static async login(email, password) {
    const externalServices = new ExternalServices();

    try {
      const response = await externalServices.loginRequest({
        email,
        password
      });

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
            <label for='email'>Email</label>
                <input type='email' name='email' id='email' required>
            <label for='password'>Password</label>
                <input type='password' name='password' id='password' required>
            <button id='submit' type='submit'>Submit</button>
        </form>`;
  }
}
