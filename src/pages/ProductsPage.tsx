import React from 'react';
import { PageHero } from '../components/Widgets';

export const ProductsPage: React.FC = () => {
  return (
    <div className="bg-white">
      <PageHero title="Products" backgroundImage="/images/page-title-bar.jpg" />

      {/* 1. E2E SECURITY */}
      <section className="page-section site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[38fr_62fr] gap-10 lg:gap-[50px] items-center">
          <div>
            <img
              src="/images/CYBERSECURITY.jpg"
              alt="E2E Security"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-[30px] leading-[1.2] font-bold text-black font-heading">
              E2E SECURITY
            </h2>
            <h4 className="text-[20px] font-bold text-black font-heading">
              Positive Firewall security solution
            </h4>
            <p className="text-black text-[18px] leading-[28px]">
              As the technology required to run your business evolves, so does the volume and complexity of threats against it. Our robust portfolio of comprehensive, industry-leading products and solutions provides unmatched protection with reduced complexity and reduced maintenance costs, from the endpoint to the data center to the cloud. Some of our security solutions include Network, Data, Firewall, Web, Email, Applications, and Cyber Security.
            </p>
          </div>
        </div>
      </section>

      {/* 2. NETWORKING */}
      <section className="page-section bg-[#f4f5f7]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[62fr_38fr] gap-10 lg:gap-[50px] items-center">
            <div className="space-y-4">
              <h2 className="text-[30px] leading-[1.2] font-bold text-black font-heading">
                NETWORKING
              </h2>
              <h4 className="text-[20px] font-bold text-black font-heading">
                router, olt, ont, onu, switches
              </h4>
              <p className="text-black text-[18px] leading-[28px]">
                Innovative technologies drive business performance today, and it’s the network that powers this digital age. Our future-proof networking solutions help you connect, collaborate and stay agile while taking control of your network’s future and reducing data center costs. With wired and wireless solutions ranging from large-scale corporate campus networks to small offices, we are the first to provide comprehensive, secure and easy-to-manage network solutions that will meet your needs today and in the future.
              </p>
            </div>

            <div>
              <img
                src="/images/router-olt-ont-onu-switches.jpg"
                alt="Networking Routers and Switches"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. WIFI */}
      <section className="page-section site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[38fr_62fr] gap-10 lg:gap-[50px] items-center">
          <div>
            <img
              src="/images/wifi.jpg"
              alt="WiFi Solutions"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-[30px] leading-[1.2] font-bold text-black font-heading">
              WIFI
            </h2>
            <h4 className="text-[20px] font-bold text-black font-heading">
              4G, 5G
            </h4>
            <p className="text-black text-[18px] leading-[28px]">
              There’s a wide range of 4G/5G Core Products, which provides service management and control of the 4G/5G services. It automatically manages and controls data sessions, enabling new business models. In addition, PCRF LTE also has the function of helping other devices other than the 3GPP networks such as Wi-Fi or fixed broadband devices to easily access the 4G/5G LTE network.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FTTX */}
      <section className="page-section bg-[#f4f5f7]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[62fr_38fr] gap-10 lg:gap-[50px] items-center mb-16">
            <div className="space-y-4">
              <h2 className="text-[30px] leading-[1.2] font-bold text-black font-heading">
                FTTX
              </h2>
              <p className="text-black text-[18px] leading-[28px]">
                Fiber to the x or fiber in the loop is a generic term for any broadband network architecture using optical fiber to provide all or part of the local loop used for last mile telecommunications.
              </p>
            </div>

            <div>
              <img
                src="/images/optical-fiber.jpg"
                alt="FTTX Solutions"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* OLT and ONT Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start border-t border-slate-200/80 pt-16">
            {/* OLT */}
            <div>
              <h2 className="text-2xl font-bold text-black font-heading mb-6">
                Optical Line Terminal (OLT)
              </h2>
              <ul className="space-y-2 text-black text-[18px] leading-[28px]">
                <li>• Support optical fiber link protection</li>
                <li>• Support optical link measurement and diagnosis</li>
                <li>• Support translation, Transparent, QinQ and other VLAN modes</li>
                <li>• Support IGMP Proxy, Snooping</li>
                <li>• Support CTC controllable multicast, support IGMP v2/v3</li>
                <li>• Support standard, extended and user-defined ACL, support 128-byte depth detection</li>
                <li>• Support DBA, traffic classification, priority and queue mapping, queue scheduling and congestion management</li>
                <li>• Support ONT pre-authorization, pre-configuration</li>
                <li>• Support ONT business template, ONT batch upgrade</li>
                <li>• Support real-time alarm detection, performance monitoring</li>
                <li>• Support upstream and downstream encryption and FEC</li>
                <li>
                  • Support CLI + Web management + NMS
                  <ul className="pl-6 mt-2 space-y-1 text-black">
                    <li>- 4 Port EPON OLT</li>
                    <li>- 8 Port EPON OLT</li>
                    <li>- 8 Port GPON OLT</li>
                    <li>- 16 Port GPON OLT</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* ONT */}
            <div>
              <h2 className="text-2xl font-bold text-black font-heading mb-6">
                Optical Network Terminal (ONT)
              </h2>
              <ul className="space-y-2 text-black text-[18px] leading-[28px]">
                <li>• Support PON, VoIP, CATV, Wi-Fi, USB integration</li>
                <li>• Plug and play, integrated automatic detection, automatic configuration and automatic firmware upgrade technology</li>
                <li>• Integrated OMCI and TR-069 remote configuration and maintenance functions</li>
                <li>• Supports flexible QinQ VLAN, DHCP server/relay and IGMP/ MLD multicast monitoring</li>
                <li>• Support optical path diagnostic monitoring, remotely disable optical path</li>
                <li>• Fully compatible with Huawei, ZTE, Richerlink, V-Sol, C-Data OLT</li>
                <li>• Support for 802.11b/g/n/ac Wi-Fi (2T X 2R)</li>
                <li>• Support NAT, firewall function</li>
                <li>• Support for IPv4 and IPv6 dual stacks</li>
                <li>• POTS integrated circuit test confirms to GR-909</li>
                <li>
                  • WAN port supports bridge, router and bridge/router hybrid mode
                  <div className="pl-6 mt-3 space-y-3">
                    <div>
                      <div className="font-semibold text-black">No WIFi ONTS</div>
                      <div className="pl-4 text-black space-y-0.5">
                        <div>- 1GE EPON ONT</div>
                        <div>- 1GE XPON ONT</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-black">Single Band WiFi ONTs</div>
                      <div className="pl-4 text-black space-y-0.5">
                        <div>- 1GE+1FE+2.4GW ONT (AD2X-1110)</div>
                        <div>- 1GE+1FE+2.4GW+1VoIP ONT (AD2X-1111)</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-black">Dual Band WiFi ONTs</div>
                      <div className="pl-4 text-black space-y-0.5">
                        <div>- 2GE+(2.4G+5G)W+1VoIP ONT (AD2X-2021)</div>
                        <div>- 4GE+(2.4G+5G)W+1VoIP ONT (AD2X-4022)</div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
