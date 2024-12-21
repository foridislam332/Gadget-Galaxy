import { Link, useLocation } from "react-router-dom";

const DashTitle = ({ title }) => {
    const { pathname } = useLocation();
    return (
        <div>
            <h2 className="text-2xl font-semibold text-dark drop-shadow-lg">{title}</h2>

            <div className="flex items-center gap-2 font-semibold">
                <Link to="/dashboard/home"
                    className="text-lightGray hover:text-primary duration-300"
                >Dashboard</Link> {
                    pathname !== '/dashboard' && <>
                        /
                        <p className="text-primary tracking-wider underline">{title}</p>
                    </>
                }
            </div>
        </div>
    );
};

export default DashTitle;