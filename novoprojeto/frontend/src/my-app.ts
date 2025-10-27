export class MyApp {
  public message = 'Hello World!';
    apiBase: string;
  users: any[];
  newUser: any;

  constructor() {
    this.apiBase = 'http://localhost:5000';
    this.users = [];
    this.newUser = { nome: '', email: '', password: '' };
  }

  attached() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      const res = await fetch(this.apiBase + '/users');
      this.users = await res.json();
    } catch (err) {
      console.error(err);
      alert('Could not load users. Make sure backend is running on http://localhost:5000');
    }
  }

  async createUser() {
    try {
      const res = await fetch(this.apiBase + '/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newUser)
      });
      if (res.ok) {
        this.newUser = { nome: '', email: '', password: '' };
        await this.loadUsers();
      } else {
        const text = await res.text();
        alert('Create failed: ' + text);
      }
    } catch (err) {
      console.error(err);
      alert('Create error');
    }
  }

  async updateUser(u: any) {
    try {
      const res = await fetch(this.apiBase + `/users/${u.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: u.nome, email: u.email, password: u.password })
      });
      if (res.ok || res.status === 204) {
        await this.loadUsers();
      } else {
        alert('Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Update error');
    }
  }

  async deleteUser(id: number) {
    if (!confirm('Delete user id ' + id + '?')) return;
    try {
      const res = await fetch(this.apiBase + `/users/${id}`, { method: 'DELETE' });
      if (res.ok || res.status === 204) {
        await this.loadUsers();
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      console.error(err);
      alert('Delete error');
    }
  }
}
