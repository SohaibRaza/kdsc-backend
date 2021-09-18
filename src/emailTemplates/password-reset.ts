export default {
  content: (): string => `<td class="wrapper">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <p>Hello there!</p>
                <p>This is just a friendly message to let you know your bonsai password has been successfully reset!</p><br/>
                <p>Thanks!</p>
                <p>The bonsai team</p><br/>
                <p><em>NOTE:</em> If you did not initiate this password reset, please contact customer support at support@trybonsai.com</p>
            </td>
        </tr>
    </table>
</td>`,
  subject: (): string => "Password successfully reset",
}
