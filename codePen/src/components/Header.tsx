import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogoutMutation } from "@/redux/slice/api";
import { HandleError } from "@/utils/HandleError";
import { updateCurrentUser, updateisLoggedIn } from "@/redux/slice/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { updateIsOwner } from "@/redux/slice/compilerSlice";

const Header = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );
  const currentUser = useSelector(
    (state: RootState) => state.appSlice.currentUser
  );

  console.log(currentUser?.picture);
  console.log("username", currentUser?.username);
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(updateisLoggedIn(false));
      dispatch(updateCurrentUser({}));
      dispatch(updateIsOwner(false))
    } catch (error) {
      HandleError(error);
    }
  };
  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <Link to="/">
        <h2 className="font-bold select-none">CodePen Clone</h2>
      </Link>
      <ul className="flex gap-2">
        <li>
          <Link to="/compiler">
            <Button variant="secondary">Compiler</Button>
          </Link>
        </li>
        <li>
          <Link to="/all-codes">
            <Button variant="secondary">All Codes</Button>
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/my-codes">
                <Button variant="secondary">My Codes</Button>
              </Link>
            </li>
            <li>
              <Link to="/compiler">
                <Button
                  loading={isLoading}
                  onClick={handleLogout}
                  variant="destructive"
                >
                  Logout
                </Button>
              </Link>
            </li>
            <li>
              <Avatar>
                <AvatarImage src={currentUser?.picture} />
                <AvatarFallback className="capitalize">
                  {currentUser?.username?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <Button variant="secondary">Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <Button variant="success">Signup</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
