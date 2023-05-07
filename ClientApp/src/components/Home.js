import "../assets/css/argon-dashboard.css";

const Home = () => {
  return (
    <>
      <div>
        <h1>Hello, world!</h1>{" "}
        <p>Welcome to your new single-page application, built with:</p>
        <ul>
          <li>
            <a href="https://get.asp.net/">ASP.NET Core</a> and{" "}
            <a href="https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx">
              C#
            </a>{" "}
            for cross-platform server-side code
          </li>
          <li>
            <a href="https://facebook.github.io/react/">React</a> for
            client-side code
          </li>
          <li>
            <a href="http://getbootstrap.com/">Bootstrap</a> for layout and
            styling
          </li>
        </ul>
        <p>To help you get started, we have also set up:</p>
        <ul>
          <li>
            <strong>Client-side navigation</strong>. For example, click{" "}
            <em>Counter</em> then <em>Back</em> to return here.
          </li>
          <li>
            <strong>Development server integration</strong>. In development
            mode, the development server from <code>create-react-app</code> runs
            in the background automatically, so your client-side resources are
            dynamically built on demand and the page refreshes when you modify
            any file.
          </li>
          <li>
            <strong>Efficient production builds</strong>. In production mode,
            development-time features are disabled, and your{" "}
            <code>dotnet publish</code> configuration produces minified,
            efficiently bundled JavaScript files.
          </li>
        </ul>
        <p>
          The <code>ClientApp</code> subdirectory is a standard React
          application based on the <code>create-react-app</code> template. If
          you open a command prompt in that directory, you can run{" "}
          <code>npm</code> commands such as <code>npm test</code> or{" "}
          <code>npm install</code>.
        </p>
      </div>
      <div class="card">
        <div class="table-responsive">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Author
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Function
                </th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Technology
                </th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Employed
                </th>
                <th class="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="d-flex px-2 py-1">
                    <div>
                      <img
                        src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-2.jpg"
                        class="avatar avatar-sm me-3"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-xs">John Michael</h6>
                      <p class="text-xs text-secondary mb-0">
                        john@creative-tim.com
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">Manager</p>
                  <p class="text-xs text-secondary mb-0">Organization</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="badge bg-gradient-success">Online</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">
                    23/04/18
                  </span>
                </td>
                <td class="align-middle">
                  <a
                    href="javascript:;"
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                  >
                    Edit
                  </a>
                </td>
              </tr>

              <tr>
                <td>
                  <div class="d-flex px-2 py-1">
                    <div>
                      <img
                        src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-3.jpg"
                        class="avatar avatar-sm me-3"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-xs">Alexa Liras</h6>
                      <p class="text-xs text-secondary mb-0">
                        alexa@creative-tim.com
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">Programator</p>
                  <p class="text-xs text-secondary mb-0">Developer</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="badge bg-gradient-secondary">Offline</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">
                    11/01/19
                  </span>
                </td>
                <td class="align-middle">
                  <a
                    href="#!"
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                  >
                    Edit
                  </a>
                </td>
              </tr>

              <tr>
                <td>
                  <div class="d-flex px-2 py-1">
                    <div>
                      <img
                        src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-4.jpg"
                        class="avatar avatar-sm me-3"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-xs">Laurent Perrier</h6>
                      <p class="text-xs text-secondary mb-0">
                        laurent@creative-tim.com
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">Executive</p>
                  <p class="text-xs text-secondary mb-0">Projects</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="badge bg-gradient-success">Online</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">
                    19/09/17
                  </span>
                </td>
                <td class="align-middle">
                  <a
                    href="#!"
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                  >
                    Edit
                  </a>
                </td>
              </tr>

              <tr>
                <td>
                  <div class="d-flex px-2 py-1">
                    <div>
                      <img
                        src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-3.jpg"
                        class="avatar avatar-sm me-3"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-xs">Michael Levi</h6>
                      <p class="text-xs text-secondary mb-0">
                        michael@creative-tim.com
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">Programator</p>
                  <p class="text-xs text-secondary mb-0">Developer</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="badge bg-gradient-success">Online</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">
                    24/12/08
                  </span>
                </td>
                <td class="align-middle">
                  <a
                    href="#!"
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                  >
                    Edit
                  </a>
                </td>
              </tr>

              <tr>
                <td>
                  <div class="d-flex px-2 py-1">
                    <div>
                      <img
                        src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-2.jpg"
                        class="avatar avatar-sm me-3"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-xs">Richard Gran</h6>
                      <p class="text-xs text-secondary mb-0">
                        richard@creative-tim.com
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">Manager</p>
                  <p class="text-xs text-secondary mb-0">Executive</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="badge bg-gradient-secondary">Offline</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">
                    04/10/21
                  </span>
                </td>
                <td class="align-middle">
                  <a
                    href="#!"
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                  >
                    Edit
                  </a>
                </td>
              </tr>

              <tr>
                <td>
                  <div class="d-flex px-2 py-1">
                    <div>
                      <img
                        src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-4.jpg"
                        class="avatar avatar-sm me-3"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-xs">Miriam Eric</h6>
                      <p class="text-xs text-secondary mb-0">
                        miriam@creative-tim.com
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">Programtor</p>
                  <p class="text-xs text-secondary mb-0">Developer</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="badge bg-gradient-secondary">Offline</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">
                    14/09/20
                  </span>
                </td>
                <td class="align-middle">
                  <a
                    href="#!"
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
