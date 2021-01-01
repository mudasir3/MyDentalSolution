import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
 import { Ionicons as Icon } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";

 const primaryColor = "#008577";
class Policies extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontSize: 23,
            marginStart: 10,
            color: "#fff"
          }}>
          Policies
        </Text>
      ),
      headerStyle: {
        backgroundColor: primaryColor
      },
      drawerLabel: "Policies",
      drawerIcon: ({ tintColor }) => (
        <Image
          resizeMode="contain"
          style={{ width: 25, height: 25 }}
          source={require("../../../assets/policy.png")}
        />
      ),
      headerLeft: () => (
        <Icon
          onPress={() => navigation.openDrawer()}
          style={{ marginStart: 20 }}
          name="md-menu"
          size={25}
          color="#fff"
        />
      )
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={{
            height: "8%",
            alignSelf: "center",
            marginTop: 50,
            marginBottom: 50
          }}
          source={require("../../../assets/edental.png")}
        />

        <ScrollView contentContainerStyle={{ padding: 25 }}>
          <Text>
            Welcome to the E-Dental Mart , operated by SR7 Tech. We respect your
            privacy and want to protect your personal information. To learn
            more, please read this Privacy Policy. This Privacy Policy explains
            how we collect, use and (under certain conditions) disclose your
            personal information. This Privacy Policy also explains the steps we
            have taken to secure your personal information. Finally, this
            Privacy Policy explains your options regarding the collection, use
            and disclosure of your personal information. By installing the app,
            you accept the practices described in this Policy. Data protection
            is a matter of trust and your privacy is important to us. We shall
            therefore only use your name and other information which relates to
            you in the manner set out in this Privacy Policy. We will only
            collect information where it is necessary for us to do so and we
            will only collect information if it is relevant to our dealings with
            you. We will only keep your information for as long as we are either
            required to by law or as is relevant for the purposes for which it
            was collected. You can use the app and browse without having to
            provide personal details. During your visit to the app you remain
            anonymous and at no time can we identify you unless you have an
            account and log on with your user name and password.
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {"\n\n"}1. Data that we collect{"\n\n"}
            </Text>
            We may collect various pieces of information if you seek to place an
            order for a product with us through the app. We collect, store and
            process your data for processing your purchase on the app and any
            possible later claims, and to provide you with our services. We may
            collect personal information including, but not limited to, your
            title, name, gender, date of birth, email address, postal address,
            delivery address (if different), telephone number, mobile number,
            fax number, payment details, payment card details or bank account
            details. {"\n\n"}We will use the information you provide to enable
            us to process your orders and to provide you with the services and
            information offered through our website and which you request.
            Further, we will use the information you provide to administer your
            account with us; verify and carry out financial transactions in
            relation to payments you make; audit the downloading of data from
            our app; improve the layout and/or content of the pages of our
            website and customize them for users; identify visitors on our
            website; carry out research on our users’ demographics; send you
            information we think you may find useful or which you have requested
            from us, including information about our products and services,
            provided you have indicated that you have not objected to being
            contacted for these purposes. Subject to obtaining your consent we
            may contact you by email with details of other products and
            services. If you prefer not to receive any marketing communications
            from us, you can opt out at any time. {"\n\n"}We may pass your name
            and address on to a third party in order to make delivery of the
            product to you (for example to our courier or supplier). You must
            only submit to us the information which is accurate and not
            misleading and you must keep it up to date and inform us of changes.
            {"\n\n"}Your actual order details may be stored with us but for
            security reasons cannot be retrieved directly by us. However, you
            may access this information by logging into your account on the app.
            Here you can view the details of your orders that have been
            completed, those which are open and those which are shortly to be
            dispatched and administer your address details, bank details ( for
            refund purposes) and any newsletter to which you may have
            subscribed. You undertake to treat the personal access data
            confidentially and not make it available to unauthorized third
            parties. We cannot assume any liability for misuse of passwords
            unless this misuse is our fault. {"\n\n"}Other uses of your Personal
            Information {"\n\n"}We may use your personal information for opinion
            and market research. Your details are anonymous and will only be
            used for statistical purposes. You can choose to opt out of this at
            any time. Any answers to surveys or opinion polls we may ask you to
            complete will not be forwarded on to third parties. Disclosing your
            email address is only necessary if you would like to take part in
            competitions. We save the answers to our surveys separately from
            your email address. {"\n\n"}We may also send you other information
            about us, the Site, our other websites, our products, sales
            promotions, our newsletters, anything relating to other companies in
            our group or our business partners. If you would prefer not to
            receive any of this additional information as detailed in this
            paragraph (or any part of it) please click the ‘unsubscribe’ link in
            any email that we send to you. Within 7 working days (days which are
            neither (i) a Sunday, nor (ii) a public holiday anywhere in
            Pakistan) of receipt of your instruction we will cease to send you
            information as requested. If your instruction is unclear we will
            contact you for clarification. {"\n\n"}We may further anonymize data
            about users of the app generally and use it for various purposes,
            including ascertaining the general location of the users and usage
            of certain aspects of the app or a link contained in an email to
            those registered to receive them, and supplying that anonymized data
            to third parties such as publishers. However, that anonymized data
            will not be capable of identifying you personally. 
            {"\n\n"}Competitions{"\n\n"} For any competition we use the data to
            notify winners and advertise our offers. You can find more details
            where applicable in our participation terms for the respective
            competition. Third Parties and Links We may pass your details to
            other companies in our group. We may also pass your details to our
            agents and subcontractors to help us with any of our uses of your
            data set out in our Privacy Policy. For example, we may use third
            parties to assist us with delivering products to you, to help us to
            collect payments from you, to analyze data and to provide us with
            marketing or customer service assistance. We may exchange
            information with third parties for the purposes of fraud protection
            and credit risk reduction. We may transfer our databases containing
            your personal information if we sell our business or part of it.
            Other than as set out in this Privacy Policy, we shall NOT sell or
            disclose your personal data to third parties without obtaining your
            prior consent unless this is necessary for the purposes set out in
            this Privacy Policy or unless we are required to do so by law. The
            app may contain advertising of third parties and links to other
            sites or frames of other sites. Please be aware that we are not
            responsible for the privacy practices or content of those third
            parties or other sites, nor for any third party to whom we transfer
            your data in accordance with our Privacy Policy.
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {"\n\n"}
              2. Security
              {"\n\n"}
            </Text>{" "}
            We have in place appropriate technical and security measures to
            prevent unauthorized or unlawful access to or accidental loss of or
            destruction or damage to your information. When we collect data
            through the app, we collect your personal details on a secure
            server. We use firewalls on our servers. Our security procedures
            mean that we may occasionally request proof of identity before we
            disclose personal information to you. You are responsible for
            protecting against unauthorized access to your password and to your
            computer.
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {"\n\n"}
              2. Security
              {"\n\n"}
            </Text>{" "}
            3. Your rights If you are concerned about your data you have the
            right to request access to the personal data which we may hold or
            process about you. You have the right to require us to correct any
            inaccuracies in your data free of charge. At any stage you also have
            the right to ask us to stop using your personal data for direct
            marketing purposes.
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {"\n\n"}
              4-Terms & Conditions
              {"\n\n"}
            </Text>
            Customers must provide full, accurate and legible information in the
            order form. Telephone number is must for most state. {"\n\n"}
            E-Dental Mart will not be responsible for wrong delivery due to
            incorrect and/or incomplete address supplied by the customer.{" "}
            {"\n\n"}All credit card payments must be authorized online. In the
            event of non-authorization of any credit card, E-Dental Mart is not
            responsible for all or part failure or non-acceptance and
            non-authorization of such credit cards. {"\n\n"}Customers must
            provide up to 1 weeks for processing and delivery of orders. In the
            event of any order that cannot be processed within 1 weeks, E-Dental
            Mart will inform the customer at the earliest. {"\n\n"}All items
            offered are subject to availability at the time of placing your
            order. All items offered may vary slightly in their size, colour and
            shape. This change is due to different display of the screen
            resolution of different users. {"\n\n"}For the custom made, refunds
            or exchanges cannot be entertained so as to maintain the quality and
            services {"\n\n"}The prices featured in E-Dental Mart are exclusive
            of Pakistan home delivery charges by Courier Service. Shipping
            charges are applicable as per the customer’s destination State and
            the Cart Value. {"\n\n"}Whatever be The Shipping Timings provided
            are the usual timings taken by Couriers, but We have No Control in
            case of any Delay due to Bad Weather or Natural Climatic Conditions,
            or unlocatable or unreachable service Pincode Area.
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {"\n\n"}
              5-Delivery Information
              {"\n\n"}
            </Text>
            E-Dental Mart at its own cost guarantees to deliver products to all
            cities across Pakistan and states all over Pakistan. E-Dental Mart
            shall not be liable for delays resulting from incomplete address
            listings. All orders are shipped by the best transport/courier
            agencies and home delivered within approximately 3-6 working days
            after dispatch of the shipment depending upon the location. Since
            transport/courier agencies do not deliver to P.O. Box address,
            customers are requested to provide full address with pin code / zip
            code. NOTE: Billing Address shall mean the address where a customer
            receives the credit card bills. Shipping address shall mean the
            address where the order shall have to be delivered. In case customer
            wishes to avail other alternate shipping options, E-Dental Mart may
            then suggest other options. On special request, E-Dental Mart may
            also provide special quotes for shipping, in case Dental goods order
            amount is large. Customer may send email to info@edentalmart.com for
            further details. In case of multiple orders, Customer may receive
            the same separately, depending on product availability and shipping
            locations. All products shall be shipped from E-Dental Mart.
            {"\n\n"}TRANSIT RISK – All orders sent by E-Dental Mart are fully
            insured by the shippment companies with no extra cost to the
            customers. In case of loss of order while ‘in transit’, E-Dental
            Mart shall not be held responsible for the order. In such
            circumstances the amount of order will be negotiated and reprocessed
            with handsome discount. {"\n\n"}TRACKING OF SHIPMENT – E-Dental Mart
            shall provide details of shipment to the customer, once package is
            handed across to the carrier agency. The email alerts shall contain
            the transport/courier agency’s website details along with tracking
            number and expected date of delivery. The Customer may use the said
            details to keep a check on status of the package. Please note that
            tracking numbers for orders shipped may take up to 24 business hours
            to become active on the websites.
            {"\n\n"}REQUEST FOR CHANGE OF POSTAL ADDRESS – Postal Address as
            provided by the Customer may be changed within 24 hours of placing
            of Order, and not later; by making the said request via email to
            info@edentalmart.com {"\n\n"}
            Cash on Delivery – E-Dental Mart Deliver Product throughout Pakistan
            with Cash on Delivery Facility only in Lahore. For other cities the
            customer has to pay complete bill before the shipment of the item.
            Payment transaction can be done via easy paisa, jazz cash and online
            bank transfer.
          </Text>
        </ScrollView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
});
  

export default createStackNavigator(
  {
    Policies: {
      screen: Policies
    }
  },
  {
    navigationOptions: {
      drawerLabel: "Policies",
      drawerIcon: ({ tintColor }) => (
        <Image
          resizeMode="contain"
          style={{ width: 25, height: 25 }}
          source={require("../../../assets/policy.png")}
        />
      ),
      headerStyle: {
        backgroundColor: primaryColor
      }
    }
  }
);
  