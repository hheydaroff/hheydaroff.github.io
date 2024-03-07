+++
author = "Hido"
title = "Hacking 1s and 0s via physics"
date = "2024-03-07"
tags = [
  "science",
  "technology"
]
draft = false
+++

I saw a very interesting [Veritasium video](https://www.youtube.com/watch?v=AaZ_RSt0KP8) on Tiktok today. It talks about how cosmic rays, high-energy particles from space, have been discovered to cause rare yet impactful phenomena on Earth. From triggering bit flips in computer systems to potentially influencing glitches in video games, the effects of cosmic rays are pervasive in modern technology. These rays can do unintended acceleration in vehicles and crashes of supercomputers at high elevations, highlighting the significant role they play in disrupting our technological systems.


Radiation can affect the transistors in computer chips by altering the electrical charge stored in them, which can potentially change the binary state (0 or 1) of the transistor. This happens through different ways, such as high-energy radiation particles ionizing the atoms in silicons that creates electron-hole pairs. This electron-hole pair, which are free charge carriers, can be absorbed by the electric field present in the transistors, causing the buildup of charge locally. Increase in the charge can change the voltage level in the transistors. 

If the collected charge is sufficient to overcome the threshold voltage of the transistor, it can cause the binary state of the transistor to change, resulting in a "bit flip." For example, a transistor storing a "1" might flip to a "0," or vice versa. These bit flips caused by radiation are known as Single-Event Upsets (SEUs). SEUs can lead to data corruption, system crashes, or other erroneous behavior in the affected electronic device.

I was thinking like it should be then possible to intentionally and in a targeted manner use methods to alter the electrical charge stored in transistors, known as  ["fault injection"](https://en.wikipedia.org/wiki/Fault_injection). Some common fault injection techniques include:
- Voltage glitching: Momentarily altering the power supply voltage to cause a fault.
- Clock glitching: Manipulating the clock signal to cause a fault during a specific operation.
- Electromagnetic fault injection (EMFI): Using localized electromagnetic pulses to induce faults in a specific area of the chip.
- Laser fault injection: Using focused laser pulses to induce faults in a specific transistor or group of transistors.


To mitigate the effects of radiation on computer chips, various techniques are employed, such as:
- Radiation hardening: Special manufacturing techniques and materials can be used to make chips more resistant to the effects of radiation.
- Error-correcting codes (ECC): Additional bits can be added to the stored data to detect and correct errors caused by bit flips.
- Redundancy: Critical components can be duplicated or triplicated to ensure that the system continues to function correctly even if one component is affected by radiation.

These techniques are particularly important for electronics used in high-radiation environments, such as in space applications or particle accelerators.