anychart.onDocumentReady(function () {

    // Create the network graph
    const chart = anychart.graph(graphData);

    // --------------------------------------------------
    // FIXED LAYOUT
    // --------------------------------------------------
    // Use the x/y coordinates from graph-data.js
    chart.layout().type("fixed");

    // --------------------------------------------------
    // NODES
    // --------------------------------------------------
    const nodes = chart.nodes();

    nodes.labels().enabled(true);
    nodes.labels().format("{%id}");

    nodes.labels().fontSize(14);
    nodes.labels().fontColor("#111111");
    nodes.labels().fontFamily("Arial");

    // --------------------------------------------------
    // NODE TOOLTIP
    // --------------------------------------------------
    nodes.tooltip().useHtml(true);

    nodes.tooltip().format(
        "<b>{%id}</b>"
    );

    // --------------------------------------------------
    // EDGES
    // --------------------------------------------------

    const edges = chart.edges();

    edges.normal().stroke(
        "rgba(120, 150, 170, 0.65)",
        1.5
    );

    edges.hovered().stroke(
        "#5B8FF9",
        3
    );

    edges.tooltip().useHtml(true);

    edges.tooltip().format(
        "<b>{%from}</b> → {%to}"
    );


    // --------------------------------------------------
    // INTERACTION
    // --------------------------------------------------

    chart.interactivity().nodes(true);
    chart.interactivity().zoomOnMouseWheel(true);
    chart.interactivity().scrollOnMouseWheel(false);

    // --------------------------------------------------
    // CONTAINER
    // --------------------------------------------------
    chart.container("graph-canvas");

    // IMPORTANT:
    // Do NOT use chart.title() here.
    // The HTML already contains "Experience Network".

    // Draw
    chart.draw();
});