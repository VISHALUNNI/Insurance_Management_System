import { Route, Routes } from "react-router-dom";
import {
  Home, PolicyPage, ClaimsPage, HealthInsurancePage, VehicleInsurancePage, LoginPage, SignupPage, ForgotPasswordPage,
 // CreateProfilePage, Dashboard, AdminDashboard, AdminRoute, PaymentSuccessPage, PurchasePolicyPage,
  //PurchaseDetailsPage, UpdateProfilePage, ResetPasswordPage
} from './'


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