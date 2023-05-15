import React from 'react';

const IndividualData = ({individualExcelData}) => {
    const studentInfo = [
        individualExcelData.Nom,
        individualExcelData.Prenom, 
        individualExcelData.cin,
        individualExcelData.revenueAnuelle, 
        individualExcelData.nouvelResident, 
        individualExcelData.handicapé,
        individualExcelData.nombreAnnee, 
        individualExcelData.provinceParents,
        individualExcelData.dateNaissance, 
        individualExcelData.gender, 
        individualExcelData.nationalite, 
        individualExcelData.etablissement,
        individualExcelData.diplomePrepare, 
        individualExcelData.cycleEtudes, 
        individualExcelData.niveauEtudes,
        individualExcelData.codeMassar
    ]
    return (
        <>
            {
                studentInfo.map((e,index) => {
                    return(
                        <td key={index}>{e}</td>
                    )
                })
            }
        </>
    )
}

export const Data = ({excelData}) => {
    console.log(excelData);
    return excelData.map((individualExcelData)=>(
        <tr key={individualExcelData.Id}>
            <IndividualData individualExcelData={individualExcelData}/>
        </tr>        
    ))
}
