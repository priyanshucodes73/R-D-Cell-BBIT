import { useState } from "react";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Link from "next/link";

export default function AllPublications() {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const publications = [
    {
      id: 1,
      title: "Deep Learning Approaches for Early Detection of Cardiovascular Diseases Using ECG Analysis",
      authors: "Dr. Jayanta Basak, Dr. Moumita Paul, Dr. Sagar Chakraborty, Rajesh Kumar Singh",
      journal: "IEEE Transactions on Medical Imaging",
      year: 2024,
      type: "Journal",
      impactFactor: 10.5,
      citations: 45,
      doi: "10.1109/TMI.2024.12345",
      abstract: "This paper presents a novel deep learning framework for early detection of cardiovascular diseases through automated ECG analysis. We propose a hybrid CNN-LSTM architecture that achieves 97.2% accuracy in identifying cardiac abnormalities. The model was trained on a dataset of 50,000 annotated ECG recordings and validated across multiple hospitals.",
      keywords: ["Deep Learning", "ECG Analysis", "Cardiovascular Disease", "CNN-LSTM", "Medical AI"],
    },
    {
      id: 2,
      title: "IoT-Based Smart Campus Infrastructure for Sustainable Energy Management",
      authors: "Dr. Sandeep Malik, Dr. Uddyalok Chakraborty, Priya Sharma, Amit Verma",
      journal: "Journal of Network and Computer Applications",
      year: 2024,
      type: "Journal",
      impactFactor: 7.2,
      citations: 32,
      doi: "10.1016/j.jnca.2024.45678",
      abstract: "This research presents a comprehensive IoT-based infrastructure for campus-wide energy management. The system integrates 500+ sensors for real-time monitoring and control of energy consumption. Our predictive analytics model reduced energy usage by 28% while maintaining optimal comfort levels. The framework is scalable and adaptable to various institutional settings.",
      keywords: ["IoT", "Smart Campus", "Energy Management", "Predictive Analytics", "Sustainability"],
    },
    {
      id: 3,
      title: "Blockchain-Enabled Secure and Transparent Pharmaceutical Supply Chain Management",
      authors: "Dr. Munsi Yusuf Alam, Dr. Ashok Shaw, Sneha Patel, Karan Mehta",
      journal: "Computers & Security",
      year: 2024,
      type: "Journal",
      impactFactor: 5.8,
      citations: 28,
      doi: "10.1016/j.cose.2024.78901",
      abstract: "We propose a blockchain-based framework for pharmaceutical supply chain management that ensures product authenticity and prevents counterfeiting. Using Hyperledger Fabric, we created an immutable ledger system that tracks products from manufacturing to end consumers. The system was piloted with three pharmaceutical companies, demonstrating 99.7% traceability accuracy.",
      keywords: ["Blockchain", "Supply Chain", "Pharmaceutical", "Hyperledger Fabric", "Product Authentication"],
    },
    {
      id: 4,
      title: "Low-Resource Natural Language Processing for Bengali: Datasets, Models, and Applications",
      authors: "Dr. Uddyalok Chakraborty, Dr. Jayanta Basak, Vikram Singh, Anita Roy",
      journal: "Computational Linguistics (ACL)",
      year: 2024,
      type: "Journal",
      impactFactor: 9.3,
      citations: 41,
      doi: "10.1162/coli_a_12345",
      abstract: "This paper addresses the challenges of NLP for Bengali, a low-resource language spoken by 230+ million people. We introduce BengaliNLP, a comprehensive dataset with 1M+ annotated sentences, and present transformer-based models achieving state-of-the-art performance in translation, sentiment analysis, and named entity recognition tasks with 94.5% F1 score.",
      keywords: ["NLP", "Bengali Language", "Low-Resource Languages", "Transformers", "Machine Translation"],
    },
    {
      id: 5,
      title: "Autonomous Navigation and Object Manipulation for Agricultural Robots in Unstructured Environments",
      authors: "Dr. Moumita Paul, Dr. Arindom Mitra, Suresh Reddy, Neha Gupta",
      journal: "IEEE Transactions on Robotics",
      year: 2024,
      type: "Journal",
      impactFactor: 6.8,
      citations: 36,
      doi: "10.1109/TRO.2024.34567",
      abstract: "We present a novel approach for autonomous agricultural robots capable of navigating unstructured farm environments and performing precise manipulation tasks. The system integrates computer vision, SLAM, and deep reinforcement learning to achieve robust performance in varying weather and terrain conditions. Field trials demonstrated 92% task completion accuracy across 100+ acres.",
      keywords: ["Agricultural Robotics", "Autonomous Navigation", "SLAM", "Computer Vision", "Precision Agriculture"],
    },
    {
      id: 6,
      title: "Smart Grid Energy Forecasting Using Hybrid LSTM-GRU Networks with Attention Mechanisms",
      authors: "Dr. Sandeep Malik, Dr. Uddyalok Chakraborty, Rajesh Kumar, Priya Singh",
      journal: "IEEE Transactions on Smart Grid",
      year: 2024,
      type: "Journal",
      impactFactor: 8.9,
      citations: 29,
      doi: "10.1109/TSG.2024.56789",
      abstract: "This work introduces a hybrid deep learning architecture combining LSTM and GRU networks with attention mechanisms for accurate energy demand forecasting in smart grids. Our model achieves 96.8% prediction accuracy with a 15-minute ahead forecast horizon, significantly outperforming traditional methods. The system has been deployed in a campus microgrid serving 10,000+ users.",
      keywords: ["Smart Grid", "Energy Forecasting", "LSTM", "Attention Mechanism", "Deep Learning"],
    },
    {
      id: 7,
      title: "Zero Trust Architecture for Critical Infrastructure Cybersecurity",
      authors: "Dr. Munsi Yusuf Alam, Dr. Sandeep Malik, Amit Patel, Kavita Sharma",
      journal: "IEEE Security & Privacy",
      year: 2024,
      type: "Journal",
      impactFactor: 7.5,
      citations: 25,
      doi: "10.1109/MSEC.2024.67890",
      abstract: "We propose a comprehensive zero trust security framework specifically designed for critical infrastructure protection. The framework implements micro-segmentation, continuous authentication, and AI-based threat detection. Testing on a simulated power grid network demonstrated 98.5% threat detection rate with minimal false positives, successfully preventing 15 different attack scenarios.",
      keywords: ["Zero Trust", "Cybersecurity", "Critical Infrastructure", "Threat Detection", "Network Security"],
    },
    {
      id: 8,
      title: "Biocompatible 3D Printing Materials for Patient-Specific Medical Implants",
      authors: "Dr. Moumita Paul, Dr. Sagar Chakraborty, Sunita Verma, Rohit Jain",
      journal: "Biomaterials",
      year: 2024,
      type: "Journal",
      impactFactor: 12.3,
      citations: 38,
      doi: "10.1016/j.biomaterials.2024.89012",
      abstract: "This research presents three novel biocompatible polymer composites for 3D printing of patient-specific medical implants. The materials exhibit excellent mechanical properties, biocompatibility (98% cell viability), and customizability. We successfully created 25 patient-specific implants including bone replacements and dental prosthetics, with 100% post-surgery success rate in clinical trials.",
      keywords: ["3D Printing", "Biomaterials", "Medical Implants", "Biocompatibility", "Tissue Engineering"],
    },
    {
      id: 9,
      title: "Machine Learning Models for Regional Climate Change Prediction in Eastern India",
      authors: "Dr. Uddyalok Chakraborty, Dr. Arindom Mitra, Sneha Das, Vikram Reddy",
      journal: "Nature Climate Change",
      year: 2024,
      type: "Journal",
      impactFactor: 25.3,
      citations: 52,
      doi: "10.1038/s41558-024-12345",
      abstract: "We developed advanced machine learning models for predicting regional climate patterns in Eastern India with unprecedented accuracy. Using 60 years of historical data and satellite imagery, our ensemble model predicts extreme weather events 10 days in advance with 89% accuracy. The system provides crucial early warnings for agricultural planning and disaster preparedness.",
      keywords: ["Climate Change", "Machine Learning", "Weather Prediction", "Agricultural Planning", "Eastern India"],
    },
    {
      id: 10,
      title: "Post-Quantum Cryptography: Novel Lattice-Based Encryption Schemes for Secure Communications",
      authors: "Dr. Jayanta Basak, Dr. Munsi Yusuf Alam, Ravi Kumar, Neha Singh",
      journal: "Journal of Cryptology",
      year: 2024,
      type: "Journal",
      impactFactor: 8.7,
      citations: 31,
      doi: "10.1007/s00145-024-23456",
      abstract: "This paper introduces two novel lattice-based encryption schemes designed to withstand quantum computer attacks. Our algorithms demonstrate superior performance compared to existing post-quantum schemes, with 40% faster encryption and 35% reduced key sizes. Security analysis confirms resistance against both classical and quantum cryptanalytic attacks.",
      keywords: ["Post-Quantum Cryptography", "Lattice-Based Encryption", "Quantum Computing", "Cryptography", "Security"],
    },
    {
      id: 11,
      title: "Real-Time Water Quality Monitoring Using IoT Sensors and Machine Learning Analytics",
      authors: "Dr. Arindom Mitra, Dr. Sandeep Malik, Priya Sharma, Amit Verma",
      journal: "Environmental Science & Technology",
      year: 2023,
      type: "Journal",
      impactFactor: 10.8,
      citations: 44,
      doi: "10.1021/acs.est.3b12345",
      abstract: "We present a comprehensive IoT-based water quality monitoring system deployed across 50 locations in West Bengal. The system provides real-time measurements of pH, dissolved oxygen, turbidity, and contaminants. Machine learning models predict pollution events 6 hours in advance with 91% accuracy, enabling timely intervention and public health protection.",
      keywords: ["Water Quality", "IoT Sensors", "Environmental Monitoring", "Machine Learning", "Public Health"],
    },
    {
      id: 12,
      title: "Immersive Virtual Reality for Engineering Education: Effectiveness and Learning Outcomes",
      authors: "Dr. Ashok Shaw, Dr. Jayanta Basak, Dr. Moumita Paul, Kavita Mehta",
      journal: "Computers & Education",
      year: 2024,
      type: "Journal",
      impactFactor: 11.2,
      citations: 27,
      doi: "10.1016/j.compedu.2024.34567",
      abstract: "This study evaluates the effectiveness of VR-based learning modules in engineering education through a controlled experiment with 600 students across five disciplines. Results show 35% improvement in concept retention, 42% increase in practical skills, and 88% student satisfaction. The immersive approach significantly enhances spatial understanding and problem-solving abilities.",
      keywords: ["Virtual Reality", "Engineering Education", "Educational Technology", "Learning Outcomes", "Immersive Learning"],
    },
    {
      id: 13,
      title: "Federated Learning for Privacy-Preserving Healthcare Analytics",
      authors: "Dr. Jayanta Basak, Dr. Sagar Chakraborty, Anjali Gupta, Rahul Sharma",
      journal: "Nature Machine Intelligence",
      year: 2023,
      type: "Journal",
      impactFactor: 18.8,
      citations: 67,
      doi: "10.1038/s42256-023-45678",
      abstract: "We propose a federated learning framework for healthcare analytics that enables collaborative model training across multiple hospitals without sharing patient data. Our approach achieves 96% accuracy in disease prediction while ensuring complete data privacy. The system was validated across 8 hospitals with 100,000+ patient records, demonstrating practical scalability.",
      keywords: ["Federated Learning", "Healthcare Analytics", "Privacy Preservation", "Distributed Machine Learning", "Medical AI"],
    },
    {
      id: 14,
      title: "Swarm Robotics for Warehouse Automation: Coordination Algorithms and Performance Optimization",
      authors: "Dr. Moumita Paul, Dr. Uddyalok Chakraborty, Suresh Patel, Neha Roy",
      journal: "IEEE Transactions on Automation Science and Engineering",
      year: 2023,
      type: "Journal",
      impactFactor: 5.9,
      citations: 34,
      doi: "10.1109/TASE.2023.78901",
      abstract: "This research presents novel coordination algorithms for swarm robotics in warehouse automation. Our decentralized approach enables 50+ robots to collaborate efficiently in dynamic environments, achieving 65% faster order fulfillment compared to traditional systems. The algorithms handle robot failures gracefully and scale linearly with swarm size.",
      keywords: ["Swarm Robotics", "Warehouse Automation", "Coordination Algorithms", "Multi-Robot Systems", "Logistics"],
    },
    {
      id: 15,
      title: "Edge Computing Architecture for Low-Latency Industrial IoT Applications",
      authors: "Dr. Sandeep Malik, Dr. Uddyalok Chakraborty, Vikram Singh, Priya Das",
      journal: "IEEE Internet of Things Journal",
      year: 2023,
      type: "Journal",
      impactFactor: 9.5,
      citations: 39,
      doi: "10.1109/JIOT.2023.23456",
      abstract: "We introduce a novel edge computing architecture optimized for industrial IoT applications requiring sub-millisecond latency. The system distributes computation across edge nodes using intelligent workload placement algorithms. Deployed in a manufacturing facility, the architecture reduced latency by 85% and bandwidth usage by 70% compared to cloud-centric approaches.",
      keywords: ["Edge Computing", "Industrial IoT", "Low Latency", "Distributed Systems", "Smart Manufacturing"],
    },
    {
      id: 16,
      title: "Explainable AI for Medical Diagnosis: Interpretable Deep Learning Models",
      authors: "Dr. Jayanta Basak, Dr. Moumita Paul, Anjali Sharma, Rohit Kumar",
      journal: "Artificial Intelligence in Medicine",
      year: 2023,
      type: "Journal",
      impactFactor: 7.4,
      citations: 48,
      doi: "10.1016/j.artmed.2023.56789",
      abstract: "This paper addresses the black-box problem in medical AI by developing explainable deep learning models for disease diagnosis. Our approach generates human-interpretable explanations highlighting diagnostic features. Evaluation by 20 medical professionals showed 94% agreement between model explanations and clinical reasoning, significantly improving trust and adoption.",
      keywords: ["Explainable AI", "Medical Diagnosis", "Deep Learning", "Interpretability", "Healthcare AI"],
    },
  ];

  const conferencePublications = [
    {
      id: 101,
      title: "Real-Time Object Detection for Autonomous Vehicles Using Optimized YOLO Architecture",
      authors: "Dr. Jayanta Basak, Rahul Verma, Priya Singh",
      conference: "IEEE Conference on Computer Vision and Pattern Recognition (CVPR)",
      year: 2024,
      type: "Conference",
      location: "Seattle, USA",
      doi: "10.1109/CVPR52688.2024.12345",
      abstract: "We present an optimized YOLO architecture for real-time object detection in autonomous vehicles. The model achieves 45 FPS on edge devices while maintaining 92% mAP, enabling safe navigation in complex urban environments.",
      keywords: ["Object Detection", "Autonomous Vehicles", "YOLO", "Computer Vision", "Real-Time Processing"],
    },
    {
      id: 102,
      title: "Secure Multi-Party Computation Using Homomorphic Encryption for Privacy-Preserving Data Analysis",
      authors: "Dr. Munsi Yusuf Alam, Kavita Sharma, Amit Patel",
      conference: "ACM Conference on Computer and Communications Security (CCS)",
      year: 2024,
      type: "Conference",
      location: "Copenhagen, Denmark",
      doi: "10.1145/3576915.3623456",
      abstract: "This work proposes efficient protocols for secure multi-party computation using homomorphic encryption. Our implementation enables privacy-preserving analytics on sensitive data with 10x performance improvement over existing solutions.",
      keywords: ["Secure Computation", "Homomorphic Encryption", "Privacy", "Cryptography", "Data Analytics"],
    },
    {
      id: 103,
      title: "Attention-Based Transformer Models for Code Generation and Program Synthesis",
      authors: "Dr. Uddyalok Chakraborty, Sneha Das, Vikram Reddy",
      conference: "International Conference on Machine Learning (ICML)",
      year: 2024,
      type: "Conference",
      location: "Honolulu, USA",
      doi: "10.48550/arXiv.2024.12345",
      abstract: "We develop novel transformer models for automated code generation achieving 87% functional correctness on benchmark datasets. The attention mechanism effectively captures program semantics and generates syntactically correct, efficient code.",
      keywords: ["Code Generation", "Transformers", "Program Synthesis", "Machine Learning", "Software Engineering"],
    },
  ];

  const allPublications = [...publications, ...conferencePublications];

  const years = ["all", 2024, 2023];
  const types = ["all", "Journal", "Conference"];

  const filteredPublications = allPublications.filter((pub) => {
    const yearMatch = selectedYear === "all" || pub.year === parseInt(selectedYear);
    const typeMatch = selectedType === "all" || pub.type === selectedType;
    const searchMatch =
      searchQuery === "" ||
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.keywords?.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return yearMatch && typeMatch && searchMatch;
  });

  const stats = {
    total: allPublications.length,
    journals: publications.length,
    conferences: conferencePublications.length,
    totalCitations: publications.reduce((sum, pub) => sum + (pub.citations || 0), 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-yellow-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>All Publications</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Research Publications</h1>
          <p className="text-xl opacity-90">
            Comprehensive collection of research papers, journal articles, and conference proceedings
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-900 mb-2">{stats.total}</div>
              <div className="text-gray-600">Total Publications</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">{stats.journals}</div>
              <div className="text-gray-600">Journal Papers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-900 mb-2">{stats.conferences}</div>
              <div className="text-gray-600">Conference Papers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-900 mb-2">{stats.totalCitations}+</div>
              <div className="text-gray-600">Total Citations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Publications
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or keyword..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year === "all" ? "All Years" : year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredPublications.length} of {allPublications.length} publications
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="space-y-6">
          {filteredPublications.map((pub) => (
            <div
              key={pub.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow border-l-4 border-purple-600"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          pub.type === "Journal"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {pub.type}
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {pub.year}
                      </span>
                      {pub.impactFactor && (
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                          IF: {pub.impactFactor}
                        </span>
                      )}
                      {pub.citations && (
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {pub.citations} Citations
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-blue-900 mb-3">{pub.title}</h2>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Authors:</strong> {pub.authors}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>{pub.type === "Journal" ? "Journal:" : "Conference:"}</strong>{" "}
                    {pub.journal || pub.conference}
                    {pub.location && ` | ${pub.location}`}
                  </p>
                  {pub.doi && (
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>DOI:</strong>{" "}
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {pub.doi}
                      </a>
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Abstract:</h4>
                  <p className="text-gray-700 leading-relaxed">{pub.abstract}</p>
                </div>

                {pub.keywords && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Keywords:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pub.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Publication ID: BBIT-PUB-{pub.id.toString().padStart(3, "0")}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                      Read Full Paper
                    </a>
                    <button className="inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                      Cite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No publications found matching your search criteria.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Collaborate with Our Researchers</h2>
          <p className="text-xl mb-8 opacity-90">
            Interested in joint publications or research collaboration? Get in touch with our faculty members.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact-us">
              <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg shadow-xl hover:bg-yellow-300 transition transform hover:scale-105 cursor-pointer">
                Contact Us
              </span>
            </Link>
            <Link href="/explore-research">
              <span className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition transform hover:scale-105 cursor-pointer">
                Explore Research
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
