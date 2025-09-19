const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const abi = [
    {
        "inputs": [
            { "internalType": "string", "name": "_fileHash", "type": "string" },
            { "internalType": "string", "name": "_fileName", "type": "string" }
        ],
        "name": "uploadFile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMyFiles",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "fileHash", "type": "string" },
                    { "internalType": "string", "name": "fileName", "type": "string" },
                    { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
                ],
                "internalType": "struct Project.File[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

let provider;
let signer;
let contract;

async function init() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);
    } else {
        alert("Install MetaMask!");
    }
}

async function uploadFile() {
    const hash = document.getElementById("fileHash").value;
    const name = document.getElementById("fileName").value;

    if (!hash || !name) {
        alert("Please enter file hash and name.");
        return;
    }

    try {
        const tx = await contract.uploadFile(hash, name);
        await tx.wait();
        alert("File uploaded successfully!");
    } catch (err) {
        console.error(err);
        alert("Error uploading file.");
    }
}

async function getFiles() {
    try {
        const files = await contract.getMyFiles();
        const list = document.getElementById("fileList");
        list.innerHTML = "";

        files.forEach(file => {
            const li = document.createElement("li");
            li.innerText = `Name: ${file.fileName} | Hash: ${file.fileHash} | Time: ${new Date(file.timestamp * 1000).toLocaleString()}`;
            list.appendChild(li);
        });
    } catch (err) {
        console.error(err);
        alert("Error fetching files.");
    }
}

window.onload = init;
