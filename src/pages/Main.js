import "../css/Main.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Password from "./Password";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocker, setSelectedLocker] = useState(0);

  const [password, setPassword] = useState("비밀번호를 입력해주세요.");

  const updatePassword = (c) => {
    if (password === "비밀번호를 입력해주세요.") {
      setPassword(c);
    } else {
      setPassword((prev) => `${prev}${c}`);
    }
  };

  const cancelInput = () => {
    setPassword("비밀번호를 입력해주세요.");
    setIsOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/locker");
        setList(data);
      } catch (e) {}
    })();
  }, []);

  const openLocker = (lockerId, password) => {
    (async () => {
      try {
        const { data } = await axios.post("/api/locker/openWithPass", {
          lockerId: lockerId,
          lockerPassword: password,
        });
        cancelInput();
        if (data.SUCCESS) {
          navigate("/orderDetail/" + data.orderId);
        } else {
          setIsOpen(false);
          toast("비밀번호가 맞지 않거나 원치않는 오류가 발생함");
        }
      } catch (e) {
        setIsOpen(false);
      }
    })();
  };

  return (
    <div className="column">
      <span className="tittle">BMFO 찾아가기</span>
      <span className="subTitle">보관하고있는 사물함번호를 클릭해주세요</span>
      <div className="space">
        {list?.map((data, idx) => {
          return (
            <Locker
              key={idx}
              isUsing={data.isUsing}
              isWating={data.isWating}
              isAvailable={data.isAvailable}
              onClick={() => {
                if (!data.isAvailable) {
                  toast(
                    `${data.lockerId}번 라커는 현재 사용되지 않는 라커입니다`
                  );
                } else if (data.isWating) {
                  toast(`${data.lockerId}번 라커는 현재 대기중인 라커입니다`);
                } else if (!data.isUsing) {
                  toast(`${data.lockerId}번 라커는 할당되지 않았습니다`);
                } else {
                  setSelectedLocker(data.lockerId);
                  setIsOpen(true);
                }
              }}
            >
              {idx + 1}
            </Locker>
          );
        })}
      </div>
      <Password
        updatePassword={updatePassword}
        isOpen={isOpen}
        password={password}
        cancelInput={cancelInput}
        lockerId={selectedLocker}
        openLocker={openLocker}
        close={() => {
          setIsOpen(false);
        }}
      />
      <ToastContainer />
    </div>
  );
};

const Locker = styled.div`
  display: inline-block;
  width: 15vw;
  height: 15vw;
  font-size: 11vw;
  padding: 0px;
  margin: 30px;
  background-color: ${({ isAvailable, isUsing, isWating }) => {
    if (!isAvailable) {
      return "gray";
    }
    if (isWating) {
      return "pink";
    }
    if (isUsing) {
      return "skyblue";
    }
    return "lightgreen";
  }};
  border-radius: 20px;
  cursor: pointer;
`;
