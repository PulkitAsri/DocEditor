const sectionTemplate = `
{{{introSection}}}
{{{principleSection}}}
{{{scopeSection}}}
{{{SeperationOfConcernSection}}}
`;

const sections = {
  introSection: {
    name: "introSection",
    value: `<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial;">Oslash Private Limited</span><span style="font-size: 11pt; font-family: Arial;"> </span></p>
    <p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 22pt; font-family: Arial;">Slice&rsquo;s description of its {{{appName}}} Software Application</span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span></p>
    <p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 13pt; font-family: Arial;">{{{orgName}}} is committed to safeguard the information and other assets shared with us by our customers, partners, and staff. They depend on us to protect their resources. Thus, it is crucial for all {{{orgName}}} staff to understand how to responsibly use our systems such that we can protect the security, availability and confidentiality of such assets.</span></p>`,
    variables: ["orgName", "appName"],
  },
  principleSection: {
    name: "principleSection",
    value: `<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 17pt; font-family: Arial;">Principle &amp; Purpose</span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span></p>
    <p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 13pt; font-family: Arial;">{{{orgName}}} has a culture of trust and integrity. This policy aims to reinforce the trust we place in each other, by ensuring we can collectively depend on each other to protect the assets of our staff, company, partners and customers.</span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span></p>`,

    variables: ["orgName"],
  },
  scopeSection: {
    name: "scopeSection",
    value: `<p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 15pt; font-family: Arial;">Scope</span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span></p>
    <p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 13pt; font-family: Arial;">This policy applies to all {{{orgName}}} employees, contractors, consultants, temporary, and other workers that interact with {{{orgName}}} systems. All such individuals are responsible for exercising good judgment to appropriately use electronic devices, data, and network resources in accordance with policies and standards, and local laws and regulation.</span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span></p>
    <p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 13pt; font-family: Arial;">This policy applies to the use of</span><span style="font-size: 13pt; font-family: Arial;"> </span><span style="font-size: 13pt; font-family: Arial;"> </span></p>
    <ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
    <li style="font-size: 13pt; font-family: Arial;">
    <p style="margin-top: 12pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Any company-issued electronic, computing ,storage,or network device.</span></p>
    </li>
    <li style="font-size: 13pt; font-family: Arial;">
    <p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Any company owned systems on Internet/Intranet, including but not limited to servers, software, operating systems, storage, network account.</span></p>
    </li>
    <li style="font-size: 13pt; font-family: Arial;">
    <p style="margin-top: 0pt; margin-bottom: 12pt;"><span style="font-size: 13pt;">Any company administered accounts with third party services providing email, storage, infrastructure, software, data, APIs, business systems etc, irrespective of whether such accounts are accessed via devices owned/leased by the company, the staff member or a third party.</span></p>
    </li>
    </ul>`,
    variables: ["orgName"],
  },
  SeperationOfConcernSection: {
    name: "SeperationOfConcernSection",
    value: `<p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span></p>
    <p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 11pt; font-family: Arial;"><br></span><span style="font-size: 17pt; font-family: Arial;">Separation of concerns</span><span style="font-size: 17pt; font-family: Arial;"><br></span><span style="font-size: 17pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"><br></span><span style="font-size: 13pt; font-family: Arial;">{{{orgName}}} staff are encouraged to separate work activities from personal activities as much as possible.</span><span style="font-size: 13pt; font-family: Arial;"><br></span><span style="font-size: 13pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"><br></span><span style="font-size: 13pt; font-family: Arial;">{{{orgName}}} staff may use your company-issued devices for reasonable personal use, but those devices do not belong to you. Specifically: </span><span style="font-size: 13pt; font-family: Arial;"><br></span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span></p>
    <p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span></p>
    <p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span></p>
    <p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial;"> </span><span style="font-size: 11pt; font-family: Arial;"> </span></p>
    <p>&nbsp;</p>`,
    variables: ["orgName"],
  },
};

module.exports = { sectionTemplate, sections };
