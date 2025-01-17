import React from "react";
const LoginComponent = () => {
  return (
    <div className="MuiBox-root jss930 jss536" tabIndex="-1" style={{ opacity: 1, transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" }}>
      <div className="MuiBox-root jss931 jss537">
        <button className="MuiButtonBase-root MuiIconButton-root" tabIndex="0" type="button">
          <span className="MuiIconButton-label">
            <svg width="24" height="24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </span>
          <span className="MuiTouchRipple-root"></span>
        </button>
      </div>
      <span className="MuiBox-root jss932">Đăng nhập</span>
      <button className="MuiButtonBase-root MuiButton-root MuiButton-text jss214 jss938 jss933 jss936 jss934 jss937" tabIndex="0" type="button">
        <span className="MuiButton-label">
          <div className="MuiBox-root jss939">
            <div className="MuiBox-root jss940" opacity="1">
              <svg width="36" height="36" fill="none">
                <path d="M18 28.542c5.822 0 10.542-4.72 10.542-10.542S23.822 7.458 18 7.458 7.458 12.178 7.458 18 12.178 28.542 18 28.542z" fill="#1877F2"></path>
                <path d="M22.104 21.047L22.57 18h-2.924v-1.977c0-.834.409-1.647 1.718-1.647h1.33v-2.594a16.18 16.18 0 00-2.36-.206c-2.408 0-3.982 1.46-3.982 4.102V18h-2.677v3.047h2.677v7.366c1.091.171 2.203.171 3.294 0v-7.366h2.457z" fill="#fff"></path>
              </svg>
              <span className="MuiBox-root jss941">Đăng nhập bằng Facebook</span>
            </div>
          </div>
        </span>
        <span className="MuiTouchRipple-root"></span>
      </button>
      <button className="MuiButtonBase-root MuiButton-root MuiButton-text jss214 jss942 jss933 jss936" tabIndex="0" type="button">
        <span className="MuiButton-label">
          <div className="MuiBox-root jss943">
            <div className="MuiBox-root jss944" opacity="1">
              <svg width="36" height="36" fill="none">
                <path d="M18.498 11.795a6.17 6.17 0 013.983 1.454l3.12-2.972a10.485 10.485 0 00-16.507 3.062l3.519 2.712a6.211 6.211 0 015.885-4.256z" fill="#D94F3D"></path>
                <path d="M12.295 17.998c0-.662.108-1.32.318-1.947l-3.519-2.712a10.467 10.467 0 000 9.318l3.519-2.712a6.174 6.174 0 01-.318-1.947z" fill="#F2C042"></path>
                <path d="M28.567 16.09H18.546v4.294h5.678a5.119 5.119 0 01-2.173 2.94l3.49 2.692c2.232-2.002 3.542-5.258 3.026-9.927z" fill="#5085ED"></path>
                <path d="M22.05 23.324a6.67 6.67 0 01-3.552.877 6.211 6.211 0 01-5.886-4.256l-3.518 2.712a10.51 10.51 0 009.404 5.84c2.573.07 5.081-.815 7.042-2.482l-3.49-2.69z" fill="#57A75C"></path>
              </svg>
              <span className="MuiBox-root jss945">Đăng nhập bằng Google</span>
            </div>
          </div>
        </span>
        <span className="MuiTouchRipple-root"></span>
      </button>
      <div className="MuiBox-root jss946">Hoặc đăng nhập bằng số điện thoại, email</div>
      <form action="#">
        <div className="MuiFormControl-root MuiFormControl-fullWidth" style={{ minWidth: 120 }}>
          <div className="MuiInputBase-root jss953 MuiInputBase-formControl" style={{ marginTop: 0, border: "none", height: 44, backgroundColor: "rgb(237, 242, 247)", borderRadius: 8, paddingLeft: 16 }}>
            <input aria-invalid="false" autoComplete="off" name="account" placeholder="Nhập số điện thoại hoặc email" type="text" className="MuiInputBase-input jss954" value="" />
          </div>
          <p className="MuiFormHelperText-root" style={{ minHeight: 24, color: "initial", marginTop: 6 }}></p>
        </div>
        <div className="MuiFormControl-root MuiFormControl-fullWidth" style={{ minWidth: 120 }}>
          <div className="MuiInputBase-root jss953 MuiInputBase-formControl MuiInputBase-adornedEnd" style={{ marginTop: 0, border: "none", height: 44, backgroundColor: "rgb(237, 242, 247)", borderRadius: 8, paddingLeft: 16, paddingRight: 16 }}>
            <input aria-invalid="false" autoComplete="off" name="password" placeholder="Mật khẩu" type="password" className="MuiInputBase-input jss954 MuiInputBase-inputAdornedEnd" value="" />
            <div className="MuiInputAdornment-root MuiInputAdornment-positionEnd">
              <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeEnd" tabIndex="0" type="button" aria-label="toggle password visibility">
                <span className="MuiIconButton-label">
                  <svg width="24" height="24" fill="none">
                    <path d="M3 3l18 18M10.584 10.587a2 2 0 102.828 2.83" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M17.357 17.349C15.726 18.449 13.942 19 12 19c-4 0-7.333-2.333-10-7 1.369-2.395 2.913-4.175 4.632-5.341m2.731-1.294A9.466 9.466 0 0112 5c4 0 7.333 2.333 10 7-.778 1.361-1.612 2.524-2.503 3.488L9.363 5.365z" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
                <span className="MuiTouchRipple-root"></span>
              </button>
            </div>
          </div>
          <p className="MuiFormHelperText-root" style={{ minHeight: 24, color: "initial", marginTop: 6 }}></p>
        </div>
        <button className="MuiButtonBase-root MuiButton-root MuiButton-text jss214 jss958" tabIndex="0" type="submit">
          <span className="MuiButton-label">
            <div className="MuiBox-root jss959">
              <div className="MuiBox-root jss960" opacity="1">Đăng nhập</div>
            </div>
          </span>
          <span className="MuiTouchRipple-root"></span>
        </button>
        <div className="MuiBox-root jss961 jss947">
          <button className="MuiButtonBase-root MuiButton-root MuiButton-text jss214 jss962" tabIndex="0" type="button">
            <span className="MuiButton-label">
              <div className="MuiBox-root jss963">
                <div className="MuiBox-root jss964" opacity="1">Khôi phục mật khẩu</div>
              </div>
            </span>
            <span className="MuiTouchRipple-root"></span>
          </button>
        </div>
        <div className="MuiBox-root jss965 jss947">
          <span className="MuiBox-root jss966">Chưa có tài khoản?</span>
          <button className="MuiButtonBase-root MuiButton-root MuiButton-text jss214 jss967" tabIndex="0" type="button">
            <span className="MuiButton-label">
              <div className="MuiBox-root jss968">
                <div className="MuiBox-root jss969" opacity="1">Đăng ký tài khoản</div>
              </div>
            </span>
            <span className="MuiTouchRipple-root"></span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyComponent; 


