import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetail = () => {
  const params = useParams();
  const [orderDetail, setOrderDetail] = useState({});
  const navigate = useNavigate();
  const orderId = params.orderId;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "/api/order/getOrderDetailForMachine?orderId=" + orderId
        );
        console.log(data);
        setOrderDetail(data);
        countDown();
      } catch (e) {
        navigate("/");
      }
    })();
  }, []);
  let cnt = 3;
  const countDown = () => {
    if (cnt == 0) {
      navigate("/");
    } else {
      cnt--;
      setTimeout(() => {
        countDown();
      }, 1000);
    }
  };

  return (
    <div>
      <span>{orderDetail.lockerId}번 라커에서</span>
      <div></div>
      {orderDetail?.orderedProducts?.map((product, idx) => {
        return (
          <span key={idx}>
            {product?.productName}({product?.count}개)
          </span>
        );
      })}
      가<div></div>
      <span>
        {new Date(orderDetail?.orderedAt).toLocaleTimeString()}부터 ~{" "}
        {new Date().toLocaleTimeString()}까지 보관되었습니다
      </span>
      <div></div>
      <span>이 메시지는 {cnt}초후 닫힙니다</span>
      <button>닫기</button>
    </div>
  );
};

export default OrderDetail;
