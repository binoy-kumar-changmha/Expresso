import { Link } from 'react-router-dom';

// function Sidebar({selectedTab, setSelectedTab}) {
function Sidebar() {

  return <>
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: "280px" }}>
      <Link href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi pe-none me-2" width="40" height="32" aria-hidden="true">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4">Sidebar</span>
      </Link>
      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        {/* <li className="nav-item" onClick={() => setSelectedTab("Home")}>
          <a href="#" className={`nav-link ${selectedTab === "Home" ? "active" : ""} text-white`} aria-current="page"> */}
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">
            <svg className="bi pe-none me-2" width="16" height="16" aria-hidden="true">
              <use xlinkHref="#home"></use>
            </svg>
            Home
          </Link>
        </li>
 
        {/* <li onClick={() => setSelectedTab("Create Post")}>
          <a href="#" className={`nav-link ${selectedTab === "Create Post" ? "active" : ""} text-white`}> */}
        <li>
          <Link to="/create-post" className="nav-link text-white">
            <svg className="bi pe-none me-2" width="16" height="16" aria-hidden="true">
              <use xlinkHref="#spee dometer2"></use>
            </svg>
            Create Post
          </Link>
        </li>

      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>My Profile</strong>
        </a>

        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </>
}

export default Sidebar
