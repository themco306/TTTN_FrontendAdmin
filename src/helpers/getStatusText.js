const  getStatusText = (status) => {
    switch (status) {
      case "PendingUserConfirmation":
        return {
          text: "Đã đặt hàng",
          icon: "pi pi-file-check",
          tooltip: "Chờ người mua xác nhận",
          type: "info",
        };
      case "Confirmed":
        return {
          text: "Đã xác nhận",
          icon: "pi pi-box",
          tooltip: "Chờ đóng gói hàng",
          type: "success",
        };
      case "Shipped":
        return {
          text: "Đang giao hàng",
          icon: "pi pi-truck",
          tooltip: "Đang giao hàng",
          type: "warn",
        };
      case "Delivered":
        return {
          text: "Đã giao hàng",
          icon: "pi pi-dollar",
          tooltip: "Giao thành công",
          type: "success",
        };
      case "Received":
        return {
          text: "Đã nhận hàng",
          icon: "pi pi-dollar",
          tooltip: "Giao thành công",
          type: "success",
        };
      case "PaymentCompleted":
        return {
          text: "Đã giao hàng",
          icon: "pi pi-dollar",
          tooltip: "Giao thành công",
          type: "success",
        };
      case "Cancelled":
        return {
          text: "Đơn bị hủy",
          icon: "pi pi-times-circle",
          tooltip: "Đã hủy",
          type: "error",
        };
      default:
        return {
          text: "Không xác định",
          icon: "pi pi-question-circle",
          tooltip: "Trạng thái không xác định",
          type: "info",
        };
    }
  };
  export default getStatusText;