// Ejemplo de estructura hexagonal propuesta

// DOMAIN LAYER (Core Business Logic)
src/
├── domain/
│   ├── patients/
│   │   ├── entities/Patient.ts
│   │   ├── repositories/PatientRepository.ts (Interface)
│   │   ├── services/PatientService.ts
│   │   └── policies/PatientPolicies.ts
│   │
│   ├── appointments/
│   │   ├── entities/Appointment.ts
│   │   ├── repositories/AppointmentRepository.ts
│   │   ├── services/SchedulingService.ts
│   │   └── policies/SchedulingPolicies.ts
│   │
│   └── shared/
│       ├── entities/BaseEntity.ts
│       ├── events/DomainEvents.ts
│       └── policies/SecurityPolicies.ts

// 🔌 INFRASTRUCTURE LAYER (External Adapters)
├── infrastructure/
│   ├── persistence/
│   │   ├── PostgresPatientRepository.ts (Implements interface)
│   │   ├── PostgresAppointmentRepository.ts
│   │   └── InMemoryPatientRepository.ts (For testing)
│   │
│   ├── external/
│   │   ├── ANMATAdapter.ts
│   │   ├── SUMARAdapter.ts
│   │   ├── SMSAdapter.ts
│   │   └── EmailAdapter.ts
│   │
│   ├── web/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── dto/
│   │
│   └── configuration/
│       ├── DatabaseConfig.ts
│       ├── ExternalServicesConfig.ts
│       └── ModuleLoader.ts

// APPLICATION LAYER (Use Cases/Ports)
├── application/
│   ├── use-cases/
│   │   ├── CreatePatientUseCase.ts
│   │   ├── ScheduleAppointmentUseCase.ts
│   │   └── GenerateReportUseCase.ts
│   │
│   ├── ports/
│   │   ├── NotificationPort.ts
│   │   ├── ReportingPort.ts
│   │   └── PaymentPort.ts
│   │
│   └── events/
│       ├── PatientCreatedHandler.ts
│       └── AppointmentScheduledHandler.ts

// MODULES (Pluggable Components)
└── modules/
    ├── core/ (Always included)
    ├── billing/ (Optional)
    ├── analytics/ (Optional)
    ├── telemedicine/ (Optional)
    └── laboratory/ (Optional)
