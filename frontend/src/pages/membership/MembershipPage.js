import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle, X, Calendar, Award, Users, Dumbbell, UserCheck, ShieldCheck
} from 'lucide-react';
import axios from 'axios';
import { message, Modal, Button } from 'antd';
// --- Mock Data ---
const mockMembershipPlans = [
  {
    id: 1,
    name: 'Basic Plan',
    description: 'For beginners, includes basic gym services.',
    price: 99,
    plan_type: 'monthly',
    is_active: true,
    benefits: 'Gym access\nStandard equipment\nLocker\nOnline courses',
    popular: false,
  },
  {
    id: 2,
    name: 'Premium Plan',
    description: 'Advanced, more courses and services.',
    price: 199,
    plan_type: 'monthly',
    is_active: true,
    benefits: 'Gym access\nAll equipment\nLocker\nOnline courses\nGroup classes\nPersonal coach',
    popular: true,
  },
  {
    id: 3,
    name: 'Elite Yearly',
    description: 'Yearly, all services unlimited.',
    price: 1999,
    plan_type: 'yearly',
    is_active: true,
    benefits: 'Gym access\nAll equipment\nLocker\nOnline courses\nGroup classes\nPersonal coach\nUnlimited premium classes',
    popular: true,
  },
];
const FeatureItem = ({ text, included }) => (
  <div className="flex items-start mb-3">
    {included ? (
      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
    ) : (
      <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
    )}
    <span className={included ? "text-gray-800" : "text-gray-500 line-through"}>{text}</span>
  </div>
);

const PlanCard = ({ plan, billingPeriod, onSelect, userMembership, isLoggedIn }) => {
  const getPrice = () => {
    const price = typeof plan.price === 'number' ? plan.price : parseFloat(plan.price || 0);
    
    if (billingPeriod === 'annual' && plan.plan_type !== 'yearly') {
      return price * 12 * 0.85; 
    } else if (billingPeriod === 'annual' && plan.plan_type === 'yearly') {
      return price; 
    } else if (billingPeriod === 'monthly' && plan.plan_type === 'yearly') {
      return price / 12; 
    } else {
      return price; 
    }
  };
  
  const actualPrice = getPrice();
  const monthlyEquivalent = parseFloat(billingPeriod === 'annual' ? actualPrice / 12 : actualPrice) || 0;
  
  const getBgGradient = () => {
    if (plan.plan_type === 'yearly' || plan.name.toLowerCase().includes('elite')) {
      return 'bg-gradient-to-b from-green-900/40 to-green-800/20 border-green-600/30';
    } else if (plan.name.toLowerCase().includes('premium') || plan.plan_type === 'quarterly') {
      return 'bg-gradient-to-b from-purple-900/40 to-purple-800/20 border-purple-600/30';
    } else {
      return 'bg-gradient-to-b from-blue-900/40 to-blue-800/20 border-blue-600/30';
    }
  };
  
  const getHighlightColor = () => {
    if (plan.plan_type === 'yearly' || plan.name.toLowerCase().includes('elite')) {
      return 'bg-green-600 hover:bg-green-700';
    } else if (plan.name.toLowerCase().includes('premium') || plan.plan_type === 'quarterly') {
      return 'bg-purple-600 hover:bg-purple-700';
    } else {
      return 'bg-primary hover:bg-blue-600';
    }
  };
  
  const isPopular = plan.name.toLowerCase().includes('premium') || 
                   plan.plan_type === 'quarterly' || 
                   plan.popular;
  
  const isPlanPurchased = () => {
    if (!userMembership || !isLoggedIn) return false;
    return userMembership.plan_id === plan.id;
  };
  
  const isAnyPlanPurchased = () => {
    return userMembership && isLoggedIn;
  };
  
  const getButtonText = () => {
    return "Select Plan";

    if (!isLoggedIn) return "Please Login First";
    if (isPlanPurchased()) return "Current Plan";
    if (isAnyPlanPurchased()) return "Change Plan";
    return "Select Plan";
  };
  
  const isButtonDisabled = () => {
    return !isLoggedIn || isPlanPurchased();
  };
  
  return (
    <div className={`rounded-xl backdrop-blur-sm border ${getBgGradient()} relative flex flex-col h-full transition-transform duration-300 hover:transform hover:scale-[1.02] group`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <span className={`${getHighlightColor()} text-black text-xs font-bold py-1 px-4 rounded-full shadow-lg`}>
            Most Popular
          </span>
        </div>
      )}
      
      {/* Current Plan Badge */}
      {isPlanPurchased() && (
        <div className="absolute -top-4 right-4 flex justify-center">
          <span className="bg-green-600 text-black text-xs font-bold py-1 px-4 rounded-full shadow-lg flex items-center">
            <UserCheck className="w-3 h-3 mr-1" />
            Current Plan
          </span>
        </div>
      )}
      
      {/* Plan Header */}
      <div className="p-6 border-b border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
        <p className="text-gray-800 text-sm mb-4">{plan.description}</p>
        
        <div className="mb-2 flex items-end">
          <span className="text-3xl font-bold text-white">${monthlyEquivalent.toFixed(2)}</span>
          <span className="text-gray-800 ml-1">/ month</span>
        </div>
        
        {billingPeriod === 'annual' && plan.plan_type !== 'yearly' && (
          <div className="text-sm text-green-400 mb-4 flex items-center">
            <span className="mr-1">Save ${(plan.price * 12 * 0.15).toFixed(2)} per year</span>
          </div>
        )}
        
        <button 
          onClick={() => onSelect(plan)}
          // disabled={isButtonDisabled()}
          className={`w-full py-3 px-4 text-white font-medium rounded-lg ${
            isButtonDisabled() 
              ? 'bg-gray-600 cursor-not-allowed' 
              : getHighlightColor()
          } transition-colors duration-200 flex items-center justify-center`}
        >
          {getButtonText()}
        </button>
      </div>
      
      {/* Plan Features */}
      <div className="p-6 flex-grow">
        <h4 className="font-semibold text-white mb-4">Includes:</h4>
        <div className="space-y-2">
          {plan.benefits && plan.benefits.split('\n').map((benefit, index) => (
            <FeatureItem key={index} text={benefit.trim()} included={true} />
          ))}
          
          {/* If no explicit non-included items, show some default ones */}
          {!plan.benefits && (
            <>
              <FeatureItem text="Access to fitness facilities" included={true} />
              <FeatureItem text="Standard equipment usage" included={true} />
              <FeatureItem text="Locker room access" included={true} />
              <FeatureItem text="Online fitness tracking" included={true} />
              {plan.plan_type !== 'monthly' && <FeatureItem text="Personal training sessions" included={true} />}
              {plan.plan_type === 'monthly' && <FeatureItem text="Personal training sessions" included={false} />}
              {(plan.plan_type === 'yearly' || plan.name.toLowerCase().includes('elite')) && <FeatureItem text="Unlimited premium classes" included={true} />}
              {plan.plan_type !== 'yearly' && <FeatureItem text="Unlimited premium classes" included={false} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const MembershipPage = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userMembership, setUserMembership] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // 获取用户信息和会员状态
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 获取当前用户信息
        const userRes = await axios.get('/api/auth/user/');
        if (userRes.data && userRes.data.id) {
          setIsLoggedIn(true);
          
          // 获取用户会员信息
          try {
            const membershipRes = await axios.get('/api/users/membership/');
            if (membershipRes.data && membershipRes.data.id) {
              setUserMembership({
                id: membershipRes.data.id,
                plan_id: membershipRes.data.membership_plan?.id,
                plan_name: membershipRes.data.membership_plan?.name,
                expiry_date: membershipRes.data.expiry_date,
                status: membershipRes.data.status
              });
            }
          } catch (membershipError) {
            console.error('获取会员信息失败:', membershipError);
            // 如果是404错误，说明用户没有会员资格
            if (membershipError.response?.status === 404) {
              setUserMembership(null);
            }
          }
        }
      } catch (error) {
        console.error('获取用户信息失败:', error);
        setIsLoggedIn(false);
      }
    };
    
    // fetchUserInfo();
  }, []);
  
  // 获取会员套餐数据
  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/orders/membership-plans/');
        const plansData = Array.isArray(res.data) ? res.data : 
                         (res.data.results ? res.data.results : []);
        
        // Ensure all active plans are displayed
        const activePlans = plansData.filter(plan => plan.is_active);
        
        setMembershipPlans(activePlans);
      } catch (error) {
        // console.error('Failed to get membership plans:', error);
        // message.error('Failed to get membership plans');
      } finally {
        setLoading(false);
      }
    };
    
    // fetchMembershipPlans();
    setMembershipPlans(mockMembershipPlans);
    setLoading(false);
  }, []);
  
  const handlePlanSelect = (plan) => {
    // if (!isLoggedIn) {
    //   message.warning('请先登录');
    //   navigate('/login');
    //   return;
    // }
    //
    // // 已经购买了此套餐
    // if (userMembership && userMembership.plan_id === plan.id) {
    //   message.info('您已经购买了此套餐');
    //   return;
    // }
    
    setSelectedPlan(plan);
    setShowModal(true);
  };
  
  // 处理支付
  const handlePayment = async () => {
    try {
      setProcessingPayment(true);
      
      // Simulate payment process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Calculate price
      const price = billingPeriod === 'annual' 
        ? (selectedPlan.plan_type === 'yearly' ? selectedPlan.price : selectedPlan.price * 12 * 0.85)
        : selectedPlan.price;
      
      // Create order
      const orderData = {
        order_type: 'membership',
        total_amount: parseFloat(price),
        discount_amount: 0,
        actual_amount: parseFloat(price),
        payment_method: 'card', // or other payment methods
        status: 'paid', // assume payment successful
        items: [
          {
            membership_plan: selectedPlan.id,
            item_name: selectedPlan.name,
            item_price: parseFloat(price),
            quantity: 1
          }
        ]
      };
      
      // Send order to backend
      // const orderRes = await axios.post('/api/orders/', orderData);
      const orderRes = {
            data: {
              id: Math.floor(Math.random() * 10000), // 随机生成订单ID
              ...orderData,
              created_at: new Date().toISOString(),
              status: 'paid'
            }}
      // Update user membership status
      // Note: In a real application, this step is usually handled by the backend
      // This is just simulating a frontend update
      setUserMembership({
        id: orderRes.data.id,
        plan_id: selectedPlan.id,
        plan_name: selectedPlan.name,
        expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // assume one year term
        status: 'active'
      });
      
      setShowModal(false);
      message.success('Payment successful! You are now a member');
    } catch (error) {
      console.error('Payment failed:', error);
      message.error('Payment failed, please try again');
    } finally {
      setProcessingPayment(false);
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-t-4 border-primary border-solid rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-2xl font-semibold text-white">Loading membership plans...</h3>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 显示会员状态 */}
      {userMembership && (
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center mb-2">
                <ShieldCheck className="w-5 h-5 text-green-400 mr-2" />
                <h3 className="text-xl font-bold text-white">You are a member</h3>
              </div>
              <p className="text-gray-300">
                Current Plan: <span className="text-primary font-medium">{userMembership.plan_name}</span>
                {userMembership.expiry_date && (
                  <span className="ml-3">Expiry Date: {new Date(userMembership.expiry_date).toLocaleDateString()}</span>
                )}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="bg-green-900/50 text-green-300 px-3 py-1 rounded-full text-sm border border-green-700/50">
                {userMembership.status === 'active' ? 'Active' : 'Pending Renewal'}
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">Membership Plans</h1>
        <p className="text-gray-800 max-w-2xl mx-auto">
          {userMembership 
            ? 'You can view or change your membership plan. Plan changes will take effect after your current plan expires.'
            : 'Choose the membership plan that best fits your fitness goals. All plans include access to our state-of-the-art facilities and professional support.'}
        </p>
      </div>
      
      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-1 inline-flex">
          <button
            className={`px-6 py-2 rounded-md transition-all ${
              billingPeriod === 'monthly' 
                ? 'bg-primary text-white' 
                : 'text-gray-800 hover:text-white'
            }`}
            onClick={() => setBillingPeriod('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 rounded-md transition-all ${
              billingPeriod === 'annual' 
                ? 'bg-primary text-white' 
                : 'text-gray-800 hover:text-white'
            }`}
            onClick={() => setBillingPeriod('annual')}
          >
            Annual <span className="text-xs font-bold ml-1 text-green-400">Save 15%</span>
          </button>
        </div>
      </div>
      
      {/* Membership Plans */}
      {membershipPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {membershipPlans.map(plan => (
            <PlanCard 
              key={plan.id}
              plan={plan}
              billingPeriod={billingPeriod}
              onSelect={handlePlanSelect}
              userMembership={userMembership}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50 mb-16">
          <h3 className="text-xl text-white font-semibold mb-2">No membership plans available</h3>
          <p className="text-gray-800">Please check back later or contact our staff</p>
        </div>
      )}
      
      {/* Features Section */}
      <div className=" backdrop-blur-sm rounded-xl p-8 mb-16 border border-gray-700/50">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">All Members Enjoy</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Dumbbell className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Modern Equipment</h3>
            <p className="text-gray-800 text-sm">Access to state-of-the-art fitness equipment for all your workout needs</p>
          </div>
          
          <div className="p-5 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Professional Trainers</h3>
            <p className="text-gray-800 text-sm">Our expert team will guide you to achieve your fitness goals</p>
          </div>
          
          <div className="p-5 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Flexible Hours</h3>
            <p className="text-gray-800 text-sm">We offer flexible opening hours to accommodate your schedule</p>
          </div>
          
          <div className="p-5 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Member Benefits</h3>
            <p className="text-gray-800 text-sm">Exclusive member discounts, priority booking, and special events</p>
          </div>
        </div>
      </div>
      

      
      <Modal
        title="Confirm Membership Purchase"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={500}
      >
        {selectedPlan && (
          <div className="py-4">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">{selectedPlan.name}</h3>
              <p className="text-gray-500">{selectedPlan.description}</p>
              
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Plan Price:</span>
                  <span className="font-medium">
                    ${billingPeriod === 'annual' 
                      ? (selectedPlan.plan_type === 'yearly' 
                        ? parseFloat(selectedPlan.price).toFixed(2)
                        : (parseFloat(selectedPlan.price) * 12 * 0.85).toFixed(2))
                      : parseFloat(selectedPlan.price).toFixed(2)
                    }
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Billing Cycle:</span>
                  <span>{billingPeriod === 'annual' ? 'Annual' : 'Monthly'}</span>
                </div>
                <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-300">
                  <span>Total:</span>
                  <span>
                    ${billingPeriod === 'annual' 
                      ? (selectedPlan.plan_type === 'yearly' 
                        ? parseFloat(selectedPlan.price).toFixed(2)
                        : (parseFloat(selectedPlan.price) * 12 * 0.85).toFixed(2))
                      : parseFloat(selectedPlan.price).toFixed(2)
                    }
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button 
                type="primary" 
                loading={processingPayment}
                onClick={handlePayment}
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MembershipPage; 