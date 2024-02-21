+++
author = "Hido"
title = "Conway's law on data"
date = "2024-02-20"
tags = [
  "data",
  "product-development"
]
draft = false
+++

Conway's Law is an adage that explains how the communication structures of the organizations are mirrored in their design systems.

<blockquote>
[O]rganizations which design systems (in the broad sense used here) are constrained to produce designs which are copies of the communication structures of these organizations.

— Melvin E. Conway, How Do Committees Invent?
</blockquote>

In order to build one or more products within a complex adaptive system, the engineers, designers, and other members of the product team should communicate about the overall development steps, assumptions, processes and components. The output of that communication is fed into the product development. Namely, at the end the product looks like how it was communicated. 

The Conway's Law is also relevant for data products. Depending on the way teams communicate directly influences the design of any data product created.

- **Silos**: If an organization has a very siloed structure, with each department functioning independently with little interaction, its data systems may also be siloed. This can lead to duplication of data, inconsistencies, and difficulties in data integration across the organization.
- **Centralized vs. Decentralized**: In a centrally organized company, where decisions are made at the top and information flows from the top down, data systems might be designed to be centralized with a strong emphasis on control and governance. Vice versa, in a more decentralized organization, data systems might be more distributed, allowing for greater autonomy at different levels or departments.

- **Collaborative Culture**: If an organization promotes a collaborative culture, its data systems are likely to be designed to promote sharing, and integration of data across teams, facilitating cross-functional analysis and decision-making.

- **Scale and Complexity**: In larger, more complex organizations, the data systems might be more modular, reflecting the need for different parts of the organization to work independently while still being able to connect with the whole.

- **Technology Choices**: Organizations might choose technologies for managing data that reflect their internal communication preferences. For example, a company that values cutting-edge innovation might adopt the latest data technologies even if they're complex, while a company that prioritizes stability and reliability might stick with proven, traditional data management solutions.

Awareness of Conway's law can help when designing or restructuring data systems, leading to more coherent and efficient architectures that better match the needs and dynamics of the organisation and its members. 