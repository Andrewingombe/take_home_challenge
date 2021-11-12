import { Component } from "react";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      isError: false,
    };
  }

  //API request
  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      this.setState({ users: data, isLoading: false });
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
  }

  render() {
    const { users, isLoading, isError } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (isError) {
      return <p>Error...</p>;
    }

    return users.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No users found</p>
    );
  }
}

export default Table;
