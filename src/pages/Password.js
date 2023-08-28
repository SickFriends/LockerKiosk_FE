import axios from "axios";
import { useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import "../css/Main.css";
import { ToastContainer, toast } from "react-toastify";

const Password = ({
  isOpen,
  lockerId,
  close,
  password,
  openLocker,
  updatePassword,
  cancelInput,
}) => {
  const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"];

  return (
    <ReactModal isOpen={isOpen}>
      <div className="password">
        <span className="tittle">{lockerId}번 라커 열기</span>
        <div></div>
        <span className="password">비밀번호 : {password}</span>
        <div style={{ margin: "5px" }}></div>
        <div className="password-wrapper">
          {numberPad.map((data, idx) => {
            return (
              <div
                className="number-pad"
                key={idx}
                onClick={() => {
                  updatePassword(data);
                }}
              >
                {data}
              </div>
            );
          })}
        </div>
        <div>
          <button
            onClick={() => {
              openLocker(lockerId, password);
            }}
            className="button"
          >
            열기
          </button>
          <button className="button_cancel" onClick={cancelInput}>
            취소
          </button>
        </div>
        <ToastContainer />
      </div>
    </ReactModal>
  );
};

export default Password;
