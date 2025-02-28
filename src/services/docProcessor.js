import lunr from "lunr";

// Mock documentation data - in a real app, this would be fetched from the CDP documentation sites
const mockDocData = {
  segment: [
    {
      id: "segment-1",
      title: "Setting up a new source in Segment",
      content:
        "To set up a new source in Segment, follow these steps:\n1. Log in to your Segment workspace\n2. Go to Sources > Add Source\n3. Select the type of source you want to add\n4. Follow the configuration steps specific to that source\n5. Save your source configuration",
      platform: "segment",
    },
    {
      id: "segment-2",
      title: "Creating an audience in Segment",
      content:
        'To create an audience in Segment:\n1. Navigate to the Personas section\n2. Click "Create Audience"\n3. Define your audience criteria using the visual builder\n4. Set up audience activation destinations\n5. Save your audience',
      platform: "segment",
    },
  ],
  mparticle: [
    {
      id: "mparticle-1",
      title: "Creating a user profile in mParticle",
      content:
        'To create a user profile in mParticle:\n1. Access your mParticle dashboard\n2. Navigate to the "Identity" section\n3. Click on "Create New User Profile"\n4. Enter the required user information and identifiers\n5. Configure user attributes and set user preferences',
      platform: "mparticle",
    },
    {
      id: "mparticle-2",
      title: "Setting up data feeds in mParticle",
      content:
        'To set up data feeds in mParticle:\n1. Go to the Setup section\n2. Select "Data Feeds"\n3. Choose the type of data feed you want to configure\n4. Enter the required connection parameters\n5. Test and validate your data feed',
      platform: "mparticle",
    },
  ],
  lytics: [
    {
      id: "lytics-1",
      title: "Building an audience segment in Lytics",
      content:
        'To build an audience segment in Lytics:\n1. Go to Segments in the main navigation\n2. Click "Create Segment"\n3. Use the Segment Builder to define your audience criteria\n4. Apply behavioral filters and engagement scores\n5. Save and activate your segment for use across marketing channels',
      platform: "lytics",
    },
    {
      id: "lytics-2",
      title: "Setting up data collection in Lytics",
      content:
        'To set up data collection in Lytics:\n1. Navigate to Sources in the menu\n2. Click "Add Data Source"\n3. Select your data source type\n4. Configure the connection settings\n5. Map data fields to Lytics schema',
      platform: "lytics",
    },
  ],
  zeotap: [
    {
      id: "zeotap-1",
      title: "Integrating data with Zeotap",
      content:
        "To integrate your data with Zeotap:\n1. Access the Data Integration section\n2. Select the integration method (API, batch upload, or connector)\n3. Configure the data mapping\n4. Set up schedules for data synchronization\n5. Validate the data integration with test data",
      platform: "zeotap",
    },
    {
      id: "zeotap-2",
      title: "Creating segments in Zeotap",
      content:
        'To create segments in Zeotap:\n1. Go to the Audience Builder section\n2. Click on "Create New Segment"\n3. Define your segment criteria using attributes and behaviors\n4. Preview the audience size and composition\n5. Save and publish your segment',
      platform: "zeotap",
    },
  ],
  comparison: [
    {
      id: "comp-1",
      title: "CDP Audience Creation Comparison",
      content:
        "Audience creation comparison across CDPs:\n\n- Segment: Uses a visual builder in the Personas section with strong identity resolution.\n- mParticle: Offers audience builder with real-time calculations and sophisticated filtering.\n- Lytics: Features behavior-based segmentation with machine learning capabilities.\n- Zeotap: Provides attribute and interest-based segmentation with third-party data enrichment.",
      platform: "comparison",
    },
    {
      id: "comp-2",
      title: "CDP Data Integration Comparison",
      content:
        "Data integration comparison across CDPs:\n\n- Segment: Offers 300+ pre-built integrations, strong API support, and server-side integration options.\n- mParticle: Provides SDK-based collection, server-to-server integrations, and feed management.\n- Lytics: Features JavaScript tag, direct database connections, and API-based integrations.\n- Zeotap: Offers batch uploads, API connections, and specialized integrations with advertising platforms.",
      platform: "comparison",
    },
  ],
};

// Flatten the documents into a single array for indexing
const flattenDocs = () => {
  let docsArray = [];
  Object.keys(mockDocData).forEach((platform) => {
    docsArray = [...docsArray, ...mockDocData[platform]];
  });
  return docsArray;
};

export const processDocs = async () => {
  // In a real app, this would fetch documentation from APIs or files
  // For this demo, we'll use the mock data and build a search index

  const documents = flattenDocs();

  // Create a map of document IDs to their content for retrieval
  const docsMap = {};
  documents.forEach((doc) => {
    docsMap[doc.id] = doc;
  });

  // Build a lunr index for searching
  const idx = lunr(function () {
    this.field("title", { boost: 10 });
    this.field("content");
    this.field("platform", { boost: 5 });
    this.ref("id");

    documents.forEach((doc) => {
      this.add(doc);
    });
  });

  return {
    search: idx,
    documents: docsMap,
    platforms: Object.keys(mockDocData),
  };
};

export const getAllDocuments = () => {
  return flattenDocs();
};
