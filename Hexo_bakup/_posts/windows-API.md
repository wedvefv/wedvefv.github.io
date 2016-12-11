Windows 和 Linux 的IPC API对应表

 

Table 1. Process mapping
Windows Linux   Classification
CreateProcess()|
CreateProcessAsUser()|   fork()|
setuid()|
exec()|  Mappable
TerminateProcess()|  kill()|  Mappable
SetThreadpriority()|
GetThreadPriority()| Setpriority()|
GetPriority()|   Mappable
GetCurrentProcessID()|   getpid()|    Mappable
Exitprocess()|   exit()|  Mappable
WaitForSingleObjec()|
WaitForMultipleObject()|
GetExitCodeProcess()|    waitpid()|
※Using Sys V semaphores, WaitForSingleObjec/MultipleObject
can be implemented  Context specific
GetEnvironmentVariable()|
SetEnvironmentVariable()|    getenv()|
setenv()|    Mappable
 

 

Table 2. Thread mapping
Windows Linux   Classification
CreateThread()|  pthread_create
pthread_attr_init
pthread_attr_setstacksize
pthread_attr_destroy    Mappable
ThreadExit()|    pthread_exit    Mappable
WaitForSingleObject()|   pthread_join
pthread_attr_setdetachstate
pthread_detach  Mappable
SetPriorityClass()|
SetThreadPriority()| setpriority
sched_setscheduler
sched_setparam

pthread_setschedparam
pthread_setschedpolicy
pthread_attr_setschedparam
pthread_attr_setschedpolicy>    
Context Specific

 

 

Table 3. Synchronization mapping
Windows Linux -- threads    Linux -- process
Mutex   Mutex - pthread library System V semaphores
Critical section    Mutex - pthread library Not applicable as critical sections are used only between the threads of the same process
Semaphore   Conditional Variable with mutex - pthreads
POSIX semaphores    System V Semaphores
Event   Conditional Variable with mutex - pthreads  System V Semaphores
 

 

Table 4. Semaphore mapping
Windows Linux -- threads    Linux -- process    Classification
CreateSemaphore sem_init    semget
semctl  Context specific
OpenSemaphore   Not applicable  semget  Context specific
WaitForSingleObject sem_wait
sem_trywait semop   Context specific
ReleaseSemaphore    sem_post    semop   Context specific
CloseHandle sem_destroy semctl  Context specific
 

 

Table 5. Event objects mapping
Windows Linux -- threads    Linux -- process    Classification
CreateEvent
OpenEvent   pthread_cond_init
sem_init    semget
semctl  Context specific
SetEvent    pthread_cond_signal
sem_post    semop   Context specific
ResetEvent  N/A N/A Context specific
WaitForSingleObject pthread_cond_wait
pthread_cond_timedwait
sem_wait
sem_trywait semop   Context specific
CloseHandle pthread_cond_destroy
sem_destroy semctl  Context specific
 

 

Table 6. Mutex mapping
Windows Linux -- threads    Linux -- process    Classification
CreateMutex pthreads_mutex_init semget
semctl  Context specific
OpenMutex   Not applicable  semget  Context specific
WaitForSingleObject pthread_mutex_lock
pthread_mutex_trylock   semop   Context specific
ReleaseMutex    pthread_mutex_unlock    semop   Context specific
CloseHandle pthread_mutex_destroy   semctl  Context specific
 

 

Table 7. Critical section mapping
Windows Linux   Classification
InitializeCriticalSection
InitializeCriticalSectionAndSpinCount   pthreads_mutex_init Mappable
EnterCriticalSection
TryEnterCriticalSection pthread_mutex_lock
pthread_mutex_trylock   Mappable
LeaveCriticalSection    pthread_mutex_unlock    Mappable
DeleteCriticalSection   pthread_mutex_destroy   Mappable
 