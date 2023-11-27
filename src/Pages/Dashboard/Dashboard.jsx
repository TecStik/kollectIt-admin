import React, { useState, useEffect, useContext } from "react"
import "antd/dist/antd.css";
import "./Dashboard.css";
import PaymentConfirmation1 from '../../Component/PaymentConfirmation/ThankyouPayment';
import PaymentConfirmation2 from '../../Component/PaymentConfirmation/DeclinedPayment';
import queryString from 'query-string';
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { Url } from '../../Pages/Core';
import {
  Cards,
  ClientForm,
  ClientData,
  CsvfileUpload,
  TransactionList,
  VocherLeger,
  PaymentData,
  AddMember,
  AdminList,
  Cashers,
  MembarList,
  Riders,
  AysnRider,
  SMSleger,
  TopUP,
  ViewMember
} from "../../Component/index";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  ForkOutlined,
  RedEnvelopeOutlined,
  LoginOutlined,
  FileOutlined,
  TeamOutlined,
  FormOutlined,
  DiffOutlined,
  UserAddOutlined,
  DollarCircleOutlined,
  UserOutlined,
  DingtalkOutlined,
  BranchesOutlined,
  TransactionOutlined,
  DatabaseOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import StoreContext from "../../ContextApi";
import { useNavigate } from "react-router-dom";
import Admin from "../../Component/Members/AdminList/admin";
import Quota from "../../Component/Quota/Quota";
import CashierDashboard from "../../Component/CashierDashboard/CashierDashboard";
import AdminDashboard from "../../Component/AdminDashboard/AdminDashboard";
import Kicon from "../Login/kollect-logo.png";
import AddQuota from "../../Component/AddQuota/AddQuota";
import { AlertDialogOverlay } from "@chakra-ui/react";

const Dashboard = () => {
  const navigate = useNavigate();
  const RoleDetails = useContext(StoreContext);
  const userData = useContext(StoreContext);
  console.log(userData?.UserData)
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [trigger, setTrigger] = useState(1);
  const [localRole, setlocalRole] = useState([]);
  const location = useLocation();


  useEffect(() => {
    const localRole = JSON.parse(localStorage.getItem("Role"));
    if (localRole) {
      setlocalRole(localRole);
    }
    localRole === "Cashier" ? setTrigger(17) : <></>;
  }, []);
  //useffect for bill
  useEffect(() => {
    const search = location.search;
    const queryParams = queryString.parse(search);
    if (queryParams.ResponseCode == "00") {
      updateBill(queryParams);
    } else if (queryParams.ResponseCode) {
      alert("Payment Failed");
      setTrigger(23);

    }
    console.log("search in Dashboard", 1);
    console.log("json in Dashboard", queryParams);

  }, [location.search]);

  RoleDetails.setRole(localRole);
  const Role = RoleDetails.Role;

  const logout = () => {
    localStorage.removeItem("Role");
    localStorage.removeItem("user");
    navigate("/");
  };

  async function updateBill(data) {
    let amount = parseFloat(data.amountPaid) * 100;
    amount = "+" + "0".repeat(8) + amount;

    const header = {
      'Content-Type': 'application/json', // Example: Sending JSON data
      'username': 'user1', // Example: Sending an authorization token
      'password': 'test',
    };

    axios({
      method: "post",
      url: Url + "/kuickpay/billPayment",
      data: {

        consumer_number: data.OrderId,
        tran_auth_id: data.TransactionId,
        transaction_amount: amount,
        tran_date: Date.now().toString(),
        tran_time: Date.now().toString(),
        bank_mnemonic: "KUICK",
        reserved: "something, special, string, can, be, send, into, it."
      },
      headers: header

    }).then((res) => {
      console.log("Response from bill Update", res);
      alert("Your payment is successfully received and recorded in our system");
      setTrigger(22);
    }).catch((err) => {
      console.log("zerror in bill", err);
      setTrigger(22);
    })
  }

  var a = [
    {
      key: "8",
      icon: <UserOutlined onClick={() => setTrigger(8)} />,
      label: (
        <div onClick={() => setTrigger(8)}>
          <span style={{ marginLeft: "5%" }}> {!collapsed ? "Admin" : ""}</span>
        </div>
      ),
    },
    {
      Admin: "Admin",
      key: "9",
      icon: <UsergroupAddOutlined onClick={() => setTrigger(9)} />,
      label: (
        <div onClick={() => setTrigger(9)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "View Members" : ""}
          </span>
        </div>
      ),
    },

    {
      Cashier: "Cashier",
      Admin: "Admin",
      key: "10",
      icon: <DingtalkOutlined onClick={() => setTrigger(10)} />,
      label: (
        <div onClick={() => setTrigger(10)}>
          <span style={{ marginLeft: "5%" }}>{!collapsed ? "Riders" : ""}</span>
        </div>
      ),
    },
    {
      // Cashier: 'Cashier',
      Admin: "Admin",
      key: "11",
      icon: <BranchesOutlined onClick={() => setTrigger(11)} />,
      label: (
        <div onClick={() => setTrigger(11)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "Assign Rider " : ""}
          </span>
        </div>
      ),
    },
  ];

  var itemChild = a.filter((num) => {
    if (Role === "SuperAdmin") {
      return num.SuperAdmin;
    } else if (Role === "Admin") {
      return num.Admin;
    } else if (Role == "Cashier") {
      return num.Cashier;
    }
  });
  var b = itemChild;

  var item = [
    {
      Cashier: "Cashier",
      Admin: "Admin",
      key: "1",
      icon: <HomeOutlined onClick={() => setTrigger(1)} />,
      label: (
        <div onClick={() => setTrigger(1)}>
          <span style={{ marginLeft: "5%" }}> {!collapsed ? "Home" : ""}</span>
        </div>
      ),
    },
    {
      Cashier: "Cashier",
      Admin: "Admin",
      key: "2",
      icon: <FormOutlined onClick={() => setTrigger(2)} />,
      label: (
        <div onClick={() => setTrigger(2)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "Add Client" : ""}
          </span>
        </div>
      ),
    },
    {
      Cashier: "Cashier",
      Admin: "Admin",
      key: "3",
      icon: <TeamOutlined onClick={() => setTrigger(3)} />,
      label: (
        <div onClick={() => setTrigger(3)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "View Clients" : ""}
          </span>
        </div>
      ),
    },
    {
      // Cashier: "Cashier",
      Admin: "Admin",
      key: "6",
      icon: <UserAddOutlined onClick={() => setTrigger(6)} />,
      label: (
        <div onClick={() => setTrigger(6)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "Add Member" : ""}
          </span>
        </div>
      ),
    },
    {
      // SuperAdmin: "SuperAdmin",
      Admin: "Admin",
      key: "24",
      icon: <UsergroupAddOutlined onClick={() => setTrigger(24)} />,
      label: (
        <div onClick={() => setTrigger(24)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "View Members" : ""}
          </span>
        </div>
      ),
    },
    {
      Cashier: "Cashier",
      Admin: "Admin",
      key: "4",
      icon: <TeamOutlined onClick={() => setTrigger(4)} />,
      label: (
        <div onClick={() => setTrigger(4)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "View Payments" : ""}
          </span>
        </div>
      ),
    },
    {
      // Cashier: "Cashier",
      Admin: "Admin",
      key: "12",
      icon: <TransactionOutlined onClick={() => setTrigger(12)} />,
      label: (
        <div onClick={() => setTrigger(12)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "Transactions" : ""}
          </span>
        </div>
      ),
    },
    {
      SuperAdmin: "SuperAdmin",
      // Cashier: "Cashier",
      // Admin: 'Admin',
      key: "16",
      icon: <BranchesOutlined onClick={() => setTrigger(16)} />,
      label: (
        <div onClick={() => setTrigger(16)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "Assign Rider " : ""}
          </span>
        </div>
      ),
    },
    {
      key: "5",
      icon: <FileOutlined onClick={() => setTrigger(5)} />,
      label: (
        <div onClick={() => setTrigger(5)}>
          <span style={{ marginLeft: "5%" }}> {!collapsed ? "Files" : ""}</span>
        </div>
      ),
    },
    {
      key: "13",
      icon: <ForkOutlined onClick={() => setTrigger(13)} />,
      label: (
        <div onClick={() => setTrigger(13)}>
          <span style={{ marginLeft: "5%" }}> {!collapsed ? "Quota" : ""}</span>
        </div>
      ),
    },

    // Role == "SuperAdmin" ? null : Role == "Cashier" ? (
    //   <></>
    // ) : (
    //   getItem("Member List", "sub4", <TeamOutlined />, itemChild, b)
    // ),

    {
      SuperAdmin: "SuperAdmin",
      // Admin: "Admin",
      key: "24",
      icon: <UsergroupAddOutlined onClick={() => setTrigger(24)} />,
      label: (
        <div onClick={() => setTrigger(24)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "View Members" : ""}
          </span>
        </div>
      ),
    },

    {
      SuperAdmin: "SuperAdmin",
      // Admin: "Admin",
      key: "18",
      icon: <UserAddOutlined onClick={() => setTrigger(18)} />,
      label: (
        <div onClick={() => setTrigger(18)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "Increase Quota" : ""}
          </span>
        </div>
      ),
    },
    {
      // Cashier: "Cashier",
      Admin: 'Admin',
      key: "16",
      icon: <BranchesOutlined onClick={() => setTrigger(16)} />,
      label: (
        <div onClick={() => setTrigger(16)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "Assign Rider " : ""}
          </span>
        </div>
      ),
    },

    {
      Admin: "Admin",
      key: "20",
      icon: <UserAddOutlined onClick={() => setTrigger(20)} />,
      label: (
        <div onClick={() => setTrigger(20)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "Cash Ledger" : ""}
          </span>
        </div>
      ),
    },
    {
      Cashier: "Cashier",
      Admin: "Admin",
      key: "19",
      icon: <UserAddOutlined onClick={() => setTrigger(19)} />,
      label: (
        <div onClick={() => setTrigger(19)}>
          <span style={{ marginLeft: "5%" }}>
            {!collapsed ? "SMS Ledger" : ""}
          </span>
        </div>
      ),
    },
    {
      Admin: "Admin",
      key: "21",
      icon: <DollarCircleOutlined onClick={() => setTrigger(21)} />,
      label: (
        <div onClick={() => setTrigger(21)}>
          <span style={{ marginLeft: "5%" }}>{!collapsed ? "Top Up" : ""}</span>
        </div>
      ),
    },
    // {
    //   Cashier: "Cashier",
    //   Admin: "Admin",
    //   key: "",
    //   icon: <LoginOutlined onClick={() => logout()} />,
    //   label: (
    //     <div onClick={() => logout()}>
    //       <span style={{ marginLeft: "5%" }}>
    //         {!collapsed ? " Log Out" : ""}
    //       </span>
    //     </div>
    //   ),
    // },
  ];

  function getItem(label, Admin, icon, children, Cashier, key) {
    return {
      key,
      icon,
      label,
      Admin,
      Cashier,
      children,
    };
  }

  var items = item.filter((num) => {
    if (Role === "SuperAdmin") {
      return num;
    } else if (Role === "Admin") {
      return num.Admin;
    } else if (Role === "Cashier") {
      return num.Cashier;
    }
  });

  const handleLogout = () => {
    logout();
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        {/* <div className="logo"> */}
        <img src={Kicon} style={{ marginBottom: "-30%", marginTop: "-10%" }} />
        {/* </div> */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{ position: "relative", top: '43px' }}
        />
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, fontSize: 30, backgroundColor: "#427D8F" }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              style: { color: "#fff", position: "relative", right: '70px', top: '40px' },
              className: "trigger",
              onClick: () => setCollapsed(!collapsed)
            }
          )}
          <div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center", position: "relative", top: '-60px' }}>
            <span className="res_2" style={{ textAlign: "center", color: "white", padding: "0px 30px" }}>
              {`${Role} Dashboard`}
            </span>
            <div style={{ display: "flex", alignItems: 'center', justifyContent: "center", padding: '0px 30px', gap: "10px", position: "relative", top: "2px" }} onClick={() => handleLogout()}>
              <h6 className="res_1" style={{ color: "#fff" }}>Welcome: {userData?.UserData?.employeeName } { (userData?.UserData?.shortCode)}</h6>
              <LoginOutlined className="icon_res1" style={{ color: "#fff", fontSize: '1.5rem', cursor: "pointer", position: "relative", top: '-2px' }} />
            </div>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "35px 16px",
            padding: 24,
            minHeight: "80vh",
            // maxHeight: "100vh",
          }}
        >
          {trigger === 1 ? (
            <>
              <AdminDashboard />
            </>
          ) : trigger === 2 ? (
            <>
              <ClientForm />
            </>
          ) : trigger === 3 ? (
            <>
              <ClientData />
            </>
          ) : trigger === 4 ? (
            <>
              <PaymentData />
            </>
          ) : trigger === 5 ? (
            <>
              <CsvfileUpload />
            </>
          ) : trigger === 6 ? (
            <>
              <AddMember />
            </>
          ) : trigger === 7 ? (
            <>
              <MembarList />
            </>
          ) : trigger === 8 ? (
            <>
              {/* <AdminList /> */}
              <Admin />
            </>
          ) : trigger === 9 ? (
            <>
              {<ViewMember />}
              {/* <Cashers /> */}
            </>
          ) : trigger === 10 ? (
            <>
              <Riders />
            </>
          ) : trigger === 11 ? (
            <>
              <AysnRider />
            </>
          ) : trigger === 12 ? (
            <>
              <TransactionList />
            </>
          ) : trigger === 13 ? (
            <>
              <Quota />
            </>
          ) : trigger === 16 ? (
            <>
              <AysnRider />
            </>
          ) : trigger === 17 ? (
            <>
              <CashierDashboard />
            </>
          ) : trigger === 18 ? (
            <>
              <AddQuota />
            </>
          ) : trigger === 19 ? (
            <>
              <SMSleger />
            </>
          ) : trigger === 20 ? (
            <>
              <VocherLeger />
            </>
          ) : trigger === 21 ? (
            <>
              <TopUP />
            </>

          ) : trigger === 22 ? (


            <>
              <PaymentConfirmation1 />
            </>
          ) : trigger === 23 ? (
            <>
              <PaymentConfirmation2 />
            </>
          )
            : trigger === 24 ? (
              <>
                <ViewMember />
              </>
            )

              : (
                <>Page Not Found</>
              )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard