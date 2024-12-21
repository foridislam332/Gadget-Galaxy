import { Helmet } from "react-helmet";
import DashTitle from "../components/DashComponents/DashTitle";
import ManageUserRole from "../components/DashComponents/ManageUserRole";

const Settings = () => {
    return (
        <>
            <Helmet>
                <title>Settings - Dashboard</title>
            </Helmet>

            <div>
                {/* Dashboard title */}
                <DashTitle title='Settings' />

                <ManageUserRole />
            </div>
        </>
    );
};

export default Settings;