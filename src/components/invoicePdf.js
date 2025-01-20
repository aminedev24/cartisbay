import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { StyleSheet, Document, Page, View, Text, Image, Font } from '@react-pdf/renderer';
import { FaEnvelope, FaGlobe } from "react-icons/fa";


// Register Arial font
Font.register({
    family: 'Roboto',
    fonts: [
      { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf' },
      { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 700, lineHeight: 1.2 }
    ]
  });

// Define styles for the PDF
const styles = StyleSheet.create({
    text: {
      hyphenationCallback: null, // Prevents hyphenation
      wordBreak: 'break-word', // Ensures words break naturally
    },
    invoiceContainer: {
      padding: '10px',
      fontFamily: 'Roboto',
    },
    headerText: {
      fontSize: '12px',
    },  
    description : {
        fontSize: '12px',
        maxWidth: '97%',
    },
    invoiceHeader: {
      display: 'flex',
      flexDirection: 'column',
      borderBottom: '2px solid #000',
      marginBottom: '5px',
    },
    headerFullWidth: {
      display: 'flex',
      justifyContent: 'flex-end',
      width:'100%',
    },
    headerFullWidthText: {
      margin: 0,
      fontSize: '13px',
      marginRight: '15px',
      alignSelf: 'flex-end',
    },
    headers: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: '5px',
      alignItems: 'center', // Ensure vertical alignment
      width: '100%',
    },
    headerLeft: {
      flex: 2,
      textAlign: 'left', // Ensure alignment with right header
    },
    headerRight: {
      flex: 1,
    },
    logo: {
      width: '150px',
    },
    contactInfo: {
      maxWidth: '70%',
    },
    contactInfoText: {
      margin: 0,
      fontSize: '12px',
      lineHeight: 1.5, // Adjust line height for better readability
      marginBottom: '3px',
    },
    iconParagraph: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: '12px',
      alignItems: 'center',
    },
    icon: {
      color: '#1e3a8a',
      marginRight: '3px',
      display: 'inline-block',
    },
    companyName: {
      fontSize: '15px',
      fontWeight: 'bold',
      marginBottom: '3px',
    },
    invoiceTitle: {
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '5px 0',
    },
    invoiceInfo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '10px',
      position: 'relative',
    },
    left: {
      width: '48%',
    },
    right: {
      width: '45%',
      textAlign: 'right',
    },
    rightImage: {
      position: 'absolute',
      top: 0,
      right: '5%',
      width: '100px',
    },
    invoiceBankInfo: {
      marginBottom: '5px',
    },
    bankInfoText: {
      margin: 0,
      fontSize: '12px',
      lineHeight: 1.5, // Consistent line height
    },
    important: {
      border: '1px solid #000',
      marginBottom: '5px',
      display: 'flex',
      flexDirection: 'row',
      gap: '4px',
    },
    notice: {
      backgroundColor: '#1da1f2',
      color: '#000',
      fontWeight: 'bold',
      padding: '10px',
      border: '1px solid #000',
      display: 'flex',
      alignItems: 'center',
      flex: 2,
      fontSize: '12px',
    },
    invoiceNumber: {
      alignSelf: 'center',
      flex: 3.5,
      fontWeight: 'bold',
      fontSize: '12px',
    },
    warning: {
      backgroundColor: 'transparent',
      border: 'none',
      marginLeft: 0,
      fontWeight: 'bold',
      flex: 6,
      fontSize: '11px',
      alignSelf: 'center',
    },
    red: {
      color: 'red',
    },
    itemsTable: {
      display: 'table',
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '5px',
    },
    tableRow: {
      display: 'table-row',
    },
    tableHeader: {
      display: 'table-cell',
      border: '1px solid #000',
      padding: '5px',
      textAlign: 'left',
      fontWeight: 'bold',
      backgroundColor: '#1da1f2',
      fontSize: '12px',
      color: '#fff',
    },
    tableCell: {
      display: 'table-cell',
      border: '1px solid #000',
      padding: '5px',
      textAlign: 'left',
      fontSize: '12px',
    },
    noteAmountContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '5px',
    },
    note: {
      width: '57%',
      border: '1px solid #000',
      hyphenationCallback: null, // Prevents hyphenation
      wordBreak: 'break-word', // Ensures words break naturally
    },
    amountContainer: {
      width: '40%',
    },
    amountTable: {
      display: 'table',
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '3px',
    },
    amountTableRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      border: '1px solid #000',
    },
    amountTableHeader: {
      flex: 1,
      textAlign: 'left',
      padding: '8px',
      fontWeight: 'bold',
      backgroundColor: '#1da1f2',
      fontSize: '12px',
      color: '#fff',
    },
    amountTableCell: {
      flex: 1,
      textAlign: 'right',
      padding: '8px',
      fontSize: '12px',
    },
    instructions: {
      marginBottom: '5px',
      maxWidth: '57%',
      border: ' 1px solid #000',
      hyphenationCallback: null, // Prevents hyphenation
      wordBreak: 'break-word', // Ensures words break naturally
    },
    instructionsList: {
      margin: 0,
      paddingLeft: '10px',
      listStyleType: 'disc',
    },
    instructionsListItem: {
      fontSize: '12px',
      lineHeight: 1.5, // Consistent line height
      marginBottom: '3px',
    },
    invoiceFooterContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    invoiceFooter: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    signatureContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    signature: {
      width: '100px',
      position: 'relative',
      left: '25%',
    },
    stamp: {
      width: '50px',
    },
    rightText : {
      marginBottom: '3px',
      fontSize: '12px',
    },
    tableRows : {
      display : 'flex',
      flexDirection: 'row',
      width: "100%",
    },
    tableHeaders: {
      flex: '1',
      border: '1px solid #000',
      padding: '5px',
      textAlign: 'left',
      fontWeight: 'bold',
      backgroundColor: '#1da1f2',
      fontSize: '12px',
      color: '#fff',
    },
    tableCells: {
      flex: '1',
      border: '1px solid #000',
      padding: '5px',
      textAlign: 'left',
      fontSize: '12px',
    },
    noticeContainer: {
      marginVertical: '5px',
      padding: '15px',
      backgroundColor: '#f9f9f9',
      borderLeftWidth: '5px',
      borderLeftColor: '#1da1f2',
    },
    noticeText: {
      fontSize: '10px',
      color: '#333',
      textAlign: 'justify',
      lineHeight: '1.5',
      fontWeight: '600',
    },

  });

  const MyPdfDocument = ({ invoiceData }) => (
    <Document>
      <Page size="A4" style={styles.invoiceContainer}>
        {/* Header Section */}
        <View style={styles.invoiceHeader}>
          <View style={styles.headerFullWidth}>
            <Text style={styles.headerFullWidthText}>{invoiceData.serialNumber}</Text>
          </View>
          <View style={styles.headers}>
            <View style={styles.headerLeft}>
              <Image style={styles.logo} src={`${process.env.PUBLIC_URL}/images/Signatureforemail.png`} />
              <View style={styles.contactInfo}>
                <Text style={styles.description}>
                  An online platform for the sale and export of used vehicles and auto parts
                </Text>
                <Text style={styles.headerText}>Registered in Japan | License No.7370001051924</Text>
                <Text style={styles.iconParagraph}>
                  <Text style={styles.icon}><FaEnvelope /></Text>
                  <Text>Email: contact@artisbay.com</Text>
                </Text>
                <Text style={styles.iconParagraph}>
                  <Text style={styles.icon}><FaGlobe /></Text>
                  <Text>Website: www.artisbay.com</Text>
                </Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.companyName}>Artisbay Inc</Text>
              <Text style={styles.rightText}><Text style={{ fontWeight: 'bold' }}>Date:</Text> {invoiceData.invoiceDate}</Text>
              <Text style={styles.rightText}><Text style={{ fontWeight: 'bold' }}>Invoice Number:</Text> {invoiceData.invoiceNumber}</Text>
              <Text style={styles.rightText}><Text style={{ fontWeight: 'bold' }}>Expiry Date:</Text> {invoiceData.expiryDate}</Text>
              <Text style={styles.rightText}><Text style={{ fontWeight: 'bold' }}>Purpose:</Text> {invoiceData.depositPurpose}</Text>
            </View>
          </View>
        </View>
  
        {/* Title */}
        <Text style={styles.invoiceTitle}>Deposit Invoice</Text>
  
        {/* Invoice Info */}
        <View style={styles.invoiceInfo}>
          <View style={styles.left}>
            <Text style={styles.contactInfoText}><Text style={{ fontWeight: '600' }}>Full name:</Text> {invoiceData.customerFullName}</Text>
            <Text style={styles.contactInfoText}><Text style={{ fontWeight: '600' }}>Company:</Text> {invoiceData.customerCompany}</Text>
            <Text style={styles.contactInfoText}><Text style={{ fontWeight: '600' }}>Address:</Text> {invoiceData.customerAddress}</Text>
            <Text style={styles.contactInfoText}><Text style={{ fontWeight: '600' }}>Phone Number:</Text> {invoiceData.customerPhone}</Text>
            <Text style={styles.contactInfoText}><Text style={{ fontWeight: '600' }}>Email:</Text> {invoiceData.customerEmail}</Text>
          </View>
          <View style={styles.right}>
            <Image style={styles.rightImage} src={`${process.env.PUBLIC_URL}/images/qr.jpeg`} />
          </View>
        </View>
  
        {/* Bank Info */}
        <View style={styles.invoiceBankInfo}>
          <Text style={styles.contactInfoText}><Text style={{ fontWeight: 'bold' }}>Beneficiary Name:</Text> {invoiceData.beneficiaryName}</Text>
          <Text style={styles.contactInfoText}><Text style={{ fontWeight: 'bold' }}>Bank Name:</Text> {invoiceData.bankName}</Text>
          <Text style={styles.contactInfoText}><Text style={{ fontWeight: 'bold' }}>Branch Name:</Text> {invoiceData.branchName}</Text>
          <Text style={styles.contactInfoText}><Text style={{ fontWeight: 'bold' }}>Bank Address:</Text> {invoiceData.bankAddress}</Text>
          <Text style={styles.contactInfoText}><Text style={{ fontWeight: 'bold' }}>Swift Code:</Text> {invoiceData.swiftCode}</Text>
          <Text style={styles.contactInfoText}><Text style={{ fontWeight: 'bold' }}>Account Number:</Text> {invoiceData.accountNumber}</Text>
          <Text style={styles.contactInfoText}><Text style={{ fontWeight: 'bold' }}>Beneficiary Address:</Text> {invoiceData.beneficiaryAddress}</Text>
        </View>
  
        {/* Important Section */}
        <View style={styles.important}>
          <View style={styles.notice}>
            <Text>Important</Text>
          </View>
          <View style={styles.invoiceNumber}>
            <Text>Invoice number: {invoiceData.invoiceNumber}</Text>
          </View>
          <View style={styles.warning}>
            <Text><Text style={styles.red}>Be careful</Text>, avoid being scammed! Confirm our correct bank account before you send your money!</Text>
          </View>
        </View>
  
        {/* Description Table */}
        <View style={styles.itemsTable}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>DESCRIPTION</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{invoiceData.depositDescription}</Text>
          </View>
        </View>
  
        {/* Vehicle Details Table (Conditional) */}
        {invoiceData.depositPurpose === 'order vehicle' && (
          <View style={styles.itemsTable}>
            {/* Table Header Row */}
            <View style={styles.tableRows}>
              <Text style={styles.tableHeaders}>Vehicle Ref</Text>
              <Text style={styles.tableHeaders}>Chasis Number</Text>
            </View>
            {/* Table Data Row */}
            <View style={styles.tableRows}>
              <Text style={styles.tableCells}>{invoiceData.vehicleRef}</Text>
              <Text style={styles.tableCells}>{invoiceData.chasisNumber}</Text>
            </View>
          </View>
        )}
  
        {/* Note and Amount Section */}
        <View style={[
            styles.noteAmountContainer,
        ]}>
            {invoiceData.bankNote ? (
                <View style={styles.note}>
                    <Text style={styles.contactInfoText}><Text style={{ fontWeight: 'bold' }}>Note for bank (By the Remitter):</Text></Text>
                    <Text style={styles.contactInfoText}>{invoiceData.bankNote}</Text>
                </View>
            ) : (
                <View style={styles.instructions}>
                    <Text style={styles.contactInfoText}><Text style={{ fontWeight: 'bold' }}>Instructions:</Text></Text>
                    <View style={styles.instructionsList}>
                        <Text style={styles.instructionsListItem}>•Please ensure all transfer fees are covered by the sender to avoid any shortfall.</Text>
                        <Text style={styles.instructionsListItem}>•Include the invoice number in the payment reference for accurate processing.</Text>
                        <Text style={styles.instructionsListItem}>•Funds will be applied upon receipt in full.Kindly notify us once the payment is completed.</Text>
                        <Text style={styles.instructionsListItem}>•Please note that our bank is located in Japan and</Text>
                        <Text style={styles.instructionsListItem}>international transfers may take 3-5 business days to reflect.</Text>
                    </View>
                </View>
            )}
            <View style={styles.amountContainer}>
                <View style={styles.amountTable}>
                    {/* Deposit Amount Row */}
                    <View style={styles.amountTableRow}>
                        <Text style={styles.amountTableHeader}>Deposit amount</Text>
                        <Text style={styles.amountTableCell}>{invoiceData.depositAmount}</Text>
                    </View>
                    {/* Grand Total Row */}
                    <View style={styles.amountTableRow}>
                        <Text style={styles.amountTableHeader}>Grand Total</Text>
                        <Text style={styles.amountTableCell}>{invoiceData.depositAmount}</Text>
                    </View>
                </View>
            </View>
        </View>
  
        {/* Footer Section */}
        <View style={[
            styles.invoiceFooterContainer,
            !invoiceData.bankNote && styles.footerRowContainer // Apply row layout when instructions are in place of the note
        ]}>
            {/* Render instructions in the footer only if bankNote is present */}
            {invoiceData.bankNote && (
                <View style={styles.instructions}>
                    <Text style={styles.contactInfoText}><Text style={{ fontWeight: 'bold' }}>Instructions:</Text></Text>
                    <View style={styles.instructionsList}>
                        <Text style={styles.instructionsListItem}>•Please ensure all transfer fees are covered by the sender to avoid any shortfall.</Text>
                        <Text style={styles.instructionsListItem}>•Include the invoice number in the payment reference for accurate processing.</Text>
                        <Text style={styles.instructionsListItem}>•Funds will be applied upon receipt in full.Kindly notify us once the payment is completed.</Text>
                        <Text style={styles.instructionsListItem}>•Please note that our bank is located in Japan and</Text>
                        <Text style={styles.instructionsListItem}>international transfers may take 3-5 business days to reflect.</Text>
                    </View>
                </View>
            )}
            <View style={[!invoiceData.bankNote && styles.invoiceFooterContainer]}>

               {/* Notice Container */}
                {!invoiceData.bankNote && (
                    <View
                    style={[
                      styles.noticeContainer,
                      !invoiceData.bankNote ? { maxWidth: '57%' } : {} // Conditional style
                    ]}
                  >
                    <Text style={styles.noticeText}>
                      This invoice is intended solely for legal and official purposes. Any unauthorized use, modification, or misrepresentation of its content is strictly prohibited and may result in legal action.
                    </Text>
                  </View>
                )}
                <View style={styles.invoiceFooter}>
                  <Text style={styles.contactInfoText}>Authorised Sales Signature</Text>
                  <View style={styles.signatureContainer}>
                      <Image style={styles.signature} src={`${process.env.PUBLIC_URL}/images/absignature.png`} />
                      <Image style={styles.stamp} src={`${process.env.PUBLIC_URL}/images/abstamp.png`} />
                  </View>
                  <Text style={styles.contactInfoText}>Thank you for your business!</Text>
                </View>
                
            </View>
  
           
        </View>
  
        {/* Render noticeContainer below the footer if bankNote is present */}
        {invoiceData.bankNote && (
            <View style={styles.noticeContainer}>
                <Text style={styles.noticeText}>
                    This invoice is intended solely for legal and official purposes. Any unauthorized use, modification, or misrepresentation of its content is strictly prohibited and may result in legal action.
                </Text>
            </View>
        )}
      </Page>
    </Document>
  );

// Function to generate the PDF as a Blob
export const generatePdfBlob = async (invoiceData) => {
  const blob = await pdf(<MyPdfDocument invoiceData={invoiceData} />).toBlob();
  return blob;
};


// Function to generate and save the PDF
const GeneratePdfButton = ({ invoiceData }) => {
  const handleGeneratePdf = async () => {
    const blob = await pdf(<MyPdfDocument invoiceData={invoiceData} />).toBlob();
    saveAs(blob, 'invoice.pdf');
  };

  return (
    <button onClick={handleGeneratePdf}>Generate PDF</button>
  );
};

export default GeneratePdfButton;