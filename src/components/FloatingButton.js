import React from "react";

class FloatingButton extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <button
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-emerald-400 to-rose-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl text-3xl font-bold z-50 hover:scale-110 transition-all duration-200 ring-4 ring-emerald-100/30" 
        onClick={onClick}
        title="Add Product"
      >
        +
      </button>
    );
  }
}

export default FloatingButton;