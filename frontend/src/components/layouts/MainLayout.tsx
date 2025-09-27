// import React from "react";
// import { Layout, Menu, theme } from "antd";
// import {
//   UserOutlined,
//   UploadOutlined,
//   BellOutlined,
//   SearchOutlined,
//   MessageOutlined,
//   HomeOutlined,
// } from "@ant-design/icons";
// import { Link, Outlet, useLocation } from "react-router-dom";

// const { Content, Footer, Sider } = Layout;

// const MainLayout: React.FC = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const location = useLocation();

//   const menuItems = [
//     {
//       key: "/profile/1",
//       icon: <UserOutlined />,
//       label: <Link to="/profile/1">Profile</Link>,
//     },
//     {
//       key: "/create",
//       icon: <UploadOutlined />,
//       label: <Link to="/create">Create</Link>,
//     },
//     {
//       key: "/messages",
//       icon: <MessageOutlined />,
//       label: <Link to="/messages">Messages</Link>,
//     },
//     {
//       key: "/notifications",
//       icon: <BellOutlined />,
//       label: <Link to="/notifications">Notifications</Link>,
//     },
//     {
//       key: "/search",
//       icon: <SearchOutlined />,
//       label: <Link to="/search">Search</Link>,
//     },
//     { key: "/", icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
//   ];

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider breakpoint="lg" collapsedWidth="0">
//         <div style={{ color: "white", padding: "16px", fontWeight: "bold" }}>
//           MyApp
//         </div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           items={menuItems}
//         />
//       </Sider>
//       <Layout>
//         <Content style={{ margin: "24px 16px 0" }}>
//           <div
//             style={{
//               padding: 24,
//               minHeight: "80vh",
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             <Outlet />
//           </div>
//         </Content>
//         <Footer style={{ textAlign: "center" }}>
//           MyApp ©{new Date().getFullYear()} Created by You 🚀
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default MainLayout;

// MainLayout.tsx
// import React from "react";
// import { Layout, Menu, theme } from "antd";
// import {
//   UserOutlined,
//   UploadOutlined,
//   BellOutlined,
//   SearchOutlined,
//   MessageOutlined,
//   HomeOutlined,
// } from "@ant-design/icons";
// import { Link, Outlet, useLocation } from "react-router-dom";

// const { Content, Footer, Sider } = Layout;

// const MainLayout: React.FC = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const location = useLocation();

//   const menuItems = [
//     { key: "/", icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
//     { key: "/profile/1", icon: <UserOutlined />, label: <Link to="/profile/1">Profile</Link> },
//     { key: "/create", icon: <UploadOutlined />, label: <Link to="/create">Create</Link> },
//     { key: "/messages", icon: <MessageOutlined />, label: <Link to="/messages">Messages</Link> },
//     { key: "/notifications", icon: <BellOutlined />, label: <Link to="/notifications">Notifications</Link> },
//     { key: "/search", icon: <SearchOutlined />, label: <Link to="/search">Search</Link> },
//   ];

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider breakpoint="lg" collapsedWidth="0">
//         <div style={{ color: "white", padding: "16px", fontWeight: "bold" }}>
//           MyApp
//         </div>
//         <Menu
//           theme="light"
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           items={menuItems}
//         />
//       </Sider>
//       <Layout>
//         <Content style={{ margin: "24px 16px 0" }}>
//           <div
//             style={{
//               padding: 24,
//               minHeight: "80vh",
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             <Outlet /> {/* Сюди підмінюються сторінки */}
//           </div>
//         </Content>
//         <Footer style={{ textAlign: "center" }}>
//           MyApp ©{new Date().getFullYear()} Created by You 🚀
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default MainLayout;

