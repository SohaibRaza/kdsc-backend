export default {
  content: (data: GenericObject): string => `<td class="wrapper">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <p>Hello there!</p>
                <p>The checklist <strong>${data.checklistName}</strong> has been created. You can complete this checklist via the following URL:</p><br/>
                <table class="btn btn-primary" role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td align="left">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td><a href="${data.runUrl}" target="_blank">Open Run</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table><br/>
                <p>Thanks!</p>
                <p>The bonsai team</p>
            </td>
        </tr>
    </table>
    </td>`,
  subject: (data: GenericObject): string => `Due: ${data.checklistName}`,
}
