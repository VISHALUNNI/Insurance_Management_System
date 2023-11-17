import React from "react";

function AnimatedRoutes(){
    return(
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/claims" element={<ClaimsPage/>}/>
        <Route path="/policies" element={<PolicyPage/>} />
        <Route path="/health-insurance" element={<HealthInsurancePage/>}/>
        <Route path="/vehicle-insurance" element={<VehicleInsurancePage/>}/>
       
      </Routes> 
    )
}
export default AnimatedRoutes