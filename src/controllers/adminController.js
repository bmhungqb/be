import { handleExportData } from "../services/adminService";

let hanldExport = async (req, res) => {
    let result = await handleExportData();
    return res.status(200).json({
        errCode: 0,
    });
}

export { hanldExport };