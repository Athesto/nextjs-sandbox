import { getEnvOrError } from "..";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

interface Redirections {
  getUrl(url: string): Promise<string | Record<string, string>>;
}

class RedirectionsImpl implements Redirections {
  spreadsheet: GoogleSpreadsheet;

  constructor({
    key,
    email,
    spreadsheetId,
  }: {
    key: string;
    email: string;
    spreadsheetId: string;
  }) {
    this.spreadsheet = this.getSpreadsheet({ key, email, spreadsheetId });
  }

  getSpreadsheet({
    email,
    key,
    spreadsheetId,
  }: {
    key: string;
    email: string;
    spreadsheetId: string;
  }): GoogleSpreadsheet {
    const jwt = new JWT({
      email,
      key,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        //"https://www.googleapis.com/auth/drive.file",
      ],
    });
    const spreadsheet = new GoogleSpreadsheet(spreadsheetId, jwt);
    return spreadsheet;
  }

  async getUrl(key: string) {
    await this.spreadsheet.loadInfo();
    const worksheet = this.spreadsheet.sheetsByIndex[0];
    const rows = await worksheet.getRows();
    const row = rows.find((row) => row.get("path") === key);
    if (row) {
      return row.get("url");
    }
    const allUrls = rows.reduce(
      (acc: Record<string, string>, row) =>
        (acc = { ...acc, [row.get("path")]: row.get("url") }),
      {}
    );

    return allUrls;
  }
}

const redirections = new RedirectionsImpl({
  email: getEnvOrError("GOOGLE_CLOUD_API_EMAIL"),
  key: getEnvOrError("GOOGLE_CLOUD_API_SECRET"),
  spreadsheetId: "1SDIUeZ00u_N_J5Ahc4gz-psEoYVQcfHB38Iv9Pc-B2k",
});

export { redirections };
